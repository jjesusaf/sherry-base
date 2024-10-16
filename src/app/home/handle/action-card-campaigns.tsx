"use client";
import React, { useEffect, useState } from "react";
import CardCampaigns from "../componentes/card-campaigns";
import { subGraphCampaigns } from "../../create-post/actions/link";
import { Campaign } from "@/src/interface/Campaign";
import { fetchMetadataFromIPFS } from "../../challengers/actions/ipfs";
import { useAccount } from "wagmi";
import { subGraphKolCampaignsByAddress } from "../actions/subgraph";
import { useAppContext } from "@/src/context/GlobalContext";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";

const ActionCardCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { address } = useAccount();
  const { idCampaign, isLoading, setLoading } = useAppContext();

  const fetchMetadataCampaigns = async (campaigns: Campaign[]) => {
    const result = address
      ? await subGraphKolCampaignsByAddress(address)
      : null;
    const kolCampaign = address ? result.data.kolCampaignAddeds : [];

    const updatedCampaigns = await Promise.all(
      campaigns.map(async (c) => {
        const metadataResponse = await fetchMetadataFromIPFS(c.uri);
        return {
          ...c,
          metadata: metadataResponse,
          subscribed:
            kolCampaign.length > 0
              ? kolCampaign.some((k: any) => k.idCampaign === c.idCampaign)
              : false,
        };
      })
    );
    setCampaigns(updatedCampaigns);
  };

  const handleSubGraph = async () => {
    try {
      const response = await subGraphCampaigns();
      const fetchedCampaigns = response.data.campaignCreateds;
      await fetchMetadataCampaigns(fetchedCampaigns);
      console.log("Estas campaigns",campaigns);
    } catch (error) {
      console.error("Error al obtener las campañas", error);
    }
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true);
        await handleSubGraph();
      } catch (error) {
        console.error("Error al obtener las campañas", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [address]);

  if (campaigns.length == 0) {
    console.log("cam",campaigns.length)
    return (
      <div className="w-full flex justify-center items-center">
        <Skeleton className="w-[352px] h-[300px]" />
      </div>
    );
  }
  const subscribedCampaigns = campaigns.filter(
    (campaign) => campaign.subscribed
  );
  const discoverCampaigns = campaigns.filter(
    (campaign) => !campaign.subscribed
  );

  return (
    <div className="w-full flex flex-col gap-[2rem]">
      <section className="flex flex-col gap-[1rem] m-0">
        <h2 className="text-xl font-semibold text-foreground">My Challenges</h2>
        {subscribedCampaigns.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
            }}
            className="w-full max-w-[352px]"
          >
            {subscribedCampaigns.map((campaign, key) => (
              <SwiperSlide key={key}>
                <CardCampaigns
                  campaign={campaign}
                  id_campaign={Number(idCampaign)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500">
            You are not subscribed to any challenge yet.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-[1rem]">
        <h2 className="text-xl font-semibold text-foreground">Discover More</h2>
        {discoverCampaigns.length > 0 && idCampaign ? (
          <div className="w-full flex flex-wrap justify-center md:justify-start items-center gap-[30px]">
            {discoverCampaigns.map((campaign, key) => (
              <CardCampaigns
                key={key}
                campaign={campaign}
                id_campaign={Number(idCampaign)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No additional campaigns to discover.</p>
        )}
      </section>
    </div>
  );
};

export default ActionCardCampaigns;
