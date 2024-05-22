import { Row } from "antd"
import styled from "styled-components"
//import { Link } from "react-router-dom"

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(167, 14, 19);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`
export const WrapperTextHeader = styled.span`
    font-size: 20px;
    color: #fff;
    front-weigh: bold;
    text-align: left;
`
export const WrapperHeaderAccout = styled.div`
    display : flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size : 12px;
    color: #fff;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
export const WrapperHeaderKeep = styled.div`
    &.fixed-header {
        position: fixed;
        z-index: 100;
    }
`