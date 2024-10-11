export interface MetadataCampaign {
    brand_name: string;
    campaign_name: string;
    description: string;
    image: string;
    start_date: number;
    end_date: number;
}

export interface Campaign {
    idCampaign: number;
    idBrand: number;
    name: string;
    amount: number;
    startDate: number;
    endDate: number;
    uri: string;
    subscribed?: boolean;
    metadata?: MetadataCampaign;
}