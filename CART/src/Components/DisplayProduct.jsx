import { memo } from "react";

function DisplayProduct({ productData, addToCart }) {
    return (
        <div className="product-content">
            {productData.map((product, index) => (
                <div className="product-card" key={`good-product-${index}`}>
                    <div>{product.title}</div>
                    <div className="image-wrap">
                        <img src={product.images[0]} alt={product.title}/>
                    </div>
                    <div>${product.price}</div>
                    <div className="btn-group">
                        <button type="button" onClick={() => addToCart(product)}>Add to Cart</button>
                        <button type="button" onClick={() => addToCart(product)}>Buy</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default memo(DisplayProduct);