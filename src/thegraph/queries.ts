import { gql } from "@apollo/client";

export const GET_DATA = gql`
{
  postCreateds {
    id
    idCampaign
    idPost
    kol
    url
  }
}
`;