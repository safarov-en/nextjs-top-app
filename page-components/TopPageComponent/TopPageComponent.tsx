import { TopPageComponentProps } from "./TopPageComponent.props"

export const TopPageComponent = ({products, page, firstCategory}: TopPageComponentProps) => {
    return (
        <>{products && products.length}</>
    )
}