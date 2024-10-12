import { Vote } from '@/src/interface/Vote';
import { PostSubGraph } from '@/src/interface/post';
import { formatTimestamp } from '@/src/utils/timestamp';

export const groupVotesByIdPost = (votes: Vote[]): Record<string, number> => {
    return votes.reduce((acc, vote) => {
        acc[vote.idPost] = (acc[vote.idPost] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
};

export const filterVotesByDate = (votes: Vote[], days: number): Vote[] => {
    const now = Date.now() / 1000; // Convertir a segundos
    const cutoff = now - days * 24 * 60 * 60; // Calcular el timestamp de corte
    return votes
      .filter(vote => parseInt(vote.blockTimestamp) >= cutoff)
      .map(vote => ({
        ...vote,
        blockTimestamp: formatTimestamp(parseInt(vote.blockTimestamp))
      }));
  };

  export const filterVotesByCampaign = (votes: Vote[], posts: PostSubGraph[]): Vote[] => {
    const postIds = posts.map(post => post.idPost);
    return votes
      .filter(vote => postIds.includes(vote.idPost))
      .map(vote => ({
        ...vote,
        blockTimestamp: formatTimestamp(parseInt(vote.blockTimestamp))
      }));
  };