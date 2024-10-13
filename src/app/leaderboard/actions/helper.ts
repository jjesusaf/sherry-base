import { Vote } from '@/src/interface/Vote';
import { PostSubGraph } from '@/src/interface/post';
import { formatTimestamp } from '@/src/utils/timestamp';

export const groupVotesByIdPost = (votes: Vote[]): { idPost: string, count: number }[] => {
    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote.idPost] = (acc[vote.idPost] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
    return Object.entries(voteCounts)
      .map(([idPost, count]) => ({
        idPost,
        count
      }))
      .sort((a, b) => b.count - a.count); // Ordenar en orden descendente por el conteo de votos
  };
export const filterVotesByDate = (votes: Vote[], days: number): Vote[] => {
    const now = Date.now() / 1000; // Convertir a segundos
    const cutoff = now - days * 24 * 60 * 60; // Calcular el timestamp de corte
    return votes
      .filter(vote => parseDateToTimestamp(vote.blockTimestamp) >= cutoff)
      .map(vote => ({
          ...vote,
          blockTimestamp: formatTimestamp(parseDateToTimestamp(vote.blockTimestamp))
        }
      ));
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

  const parseDateToTimestamp = (dateStr: string): number => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day); // Los meses son 0-indexados
    return Math.floor(date.getTime() / 1000); // Convertir a segundos
  };