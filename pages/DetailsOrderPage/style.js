import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 18px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address-info,.phon-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 18px;
    margin-top: 8px;

  }
  
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
    font-size: 18px;
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
`

export const WrapperProduct = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  border: 1px solid #ccc;
`;

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
  margin-top: 10px;
  font-size: 12px;
`

export const WrapperItem = styled.div`
  font-size: 15px;
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  font-size: 18px;
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`