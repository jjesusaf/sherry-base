export const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convertir el timestamp a milisegundos
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};