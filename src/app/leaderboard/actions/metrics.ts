"use server"
import {
    groupVotesByIdPost,
    filterVotesByDate,
    filterVotesByCampaign,
} from "./helper";
import { subGraphPostCreatedsByCampaign, postsByCampaigns } from "@/src/actions/subgraph/posts-by-campaign";
import { subGraphVotes } from "@/src/app/create-post/actions/link";
import { Vote } from "@/src/interface/Vote";
import { Challenge } from "@/src/interface/Challenge";
import { boolean } from "zod";

export interface Metrics {
    idPost: number;
    votes: number;
    kol: string;
}

export const fetchMetrics = async (idCampaign: string) => {
    try {
        const [votesRes, postsRes] = await Promise.all([
            subGraphVotes(),
            subGraphPostCreatedsByCampaign(idCampaign),
        ]);

        const votes = votesRes.data?.voteds || [];
        const posts = postsRes.data?.postCreateds || [];

        if (votesRes.errors) {
            throw new Error(`votesRes.errors: ${votesRes.errors}`);
        }

        if (postsRes.errors) {
            throw new Error(`postsRes.errors: ${postsRes.errors}`);
        }

        if (votes.length > 0 && posts.length > 0) {
            const filteredVotes: Vote[] = filterVotesByCampaign(votes, posts);
            const votesByDate: Vote[] = filterVotesByDate(filteredVotes, 7);
            const votesByIdPost = groupVotesByIdPost(votesByDate);
            const postsByKol: Challenge[] | undefined = await postsByCampaigns(idCampaign);

            if (!postsByKol) {
                //throw new Error("No posts found for the campaign");
                console.log("No posts found for the campaign");
                return []
            }

            const metrics = postsByKol.map((post: Challenge) => {
                return {
                    idPost: parseInt(post.id_post),
                    votes: Number(votesByIdPost.find(v => Number(v.idPost) === Number(post.id_post))?.count) || 0,
                    kol: post.kol.name,
                };
            });

            return metrics.sort((a, b) => b.votes - a.votes);
        }

        return [];
    } catch (error) {
        console.error("Error fetching metrics: ", error);
        throw error;
    }
};

export const calculateUserRanking = (metrics: Metrics[], userKol: string) => {
    console.log("CALCULATE USER RANKING");

    // Step 1: Group votes by KOL
    const kolVotes = metrics.reduce((acc, metric) => {
        const normalizedKol = metric.kol.trim().toUpperCase();
        if (!acc[normalizedKol]) {
            acc[normalizedKol] = 0;
        }
        acc[normalizedKol] += metric.votes;
        return acc;
    }, {} as Record<string, number>);

    // Step 2: Convert to array and sort by votes in descending order
    const sortedKols = Object.entries(kolVotes)
        .map(([kol, votes]) => ({ kol, votes }))
        .sort((a, b) => b.votes - a.votes);

    // Step 3: Normalize userKol and find user ranking and percentage
    const normalizedUserKol = userKol.trim().toUpperCase();
    let userIndex = sortedKols.findIndex(k => k.kol === normalizedUserKol);
    let found: boolean = false;
    
    if (userIndex === -1) {
        userIndex = metrics.length;
        found = true;
    }

    const userRanking = {
        kol: userKol,
        votes: found ? 0 : sortedKols[userIndex].votes,
        rank: userIndex + 1,
        percentage: found ? "???" : (((sortedKols.length - userIndex) / sortedKols.length) * 100).toFixed(2),
    };

    console.log("User ranking: ", userRanking);

    return { rank: userRanking.rank, percentage: userRanking.percentage };
};