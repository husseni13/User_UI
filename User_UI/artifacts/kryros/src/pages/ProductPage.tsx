import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCcw, Share2, Minus, Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mockData";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id) || products[0];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImg] = useState(0);
  const addToCart = useCartStore((s) => s.addToCart);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, qty, image: product.image });
    toast.success("Added to cart", { description: `${qty}x ${product.name}` });
  };

  const mockImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-28 md:pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link href="/"><span className="hover:text-primary cursor-pointer">Home</span></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop"><span className="hover:text-primary cursor-pointer">Shop</span></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?cat=${product.category}`}><span className="hover:text-primary cursor-pointer">{product.category}</span></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium truncate max-w-[120px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image gallery */}
        <div>
          <div className="bg-[#DFE3E8] dark:bg-muted rounded-2xl overflow-hidden aspect-square mb-3 relative group">
            <img src={mockImages[activeImg]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-destructive text-white text-sm font-bold px-3 py-1 rounded-xl">
                -{product.discount}%
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {mockImages.map((img, i) => (
              <div key={i} className={`rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-all ${i === activeImg ? "border-primary" : "border-transparent hover:border-primary/50"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <p className="text-primary text-sm font-semibold mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">{product.name}</h1>
          <p className="text-muted-foreground text-sm mb-3">{product.specs}</p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-5">
            <span className="text-3xl md:text-4xl font-black text-foreground">
              ${product.price.toLocaleString("en", { minimumFractionDigits: 2 })}
            </span>
            {product.oldPrice > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through mb-1">
                  ${product.oldPrice.toLocaleString("en", { minimumFractionDigits: 2 })}
                </span>
                <span className="text-sm font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-lg mb-1">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mb-5">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600 font-medium">In Stock ({product.stock} available)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-sm text-destructive font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Get Now option */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-5">
            <p className="text-xs text-muted-foreground">or <span className="font-bold text-foreground">${(product.price / 12).toFixed(2)}/mo</span> for 12 months with <Link href="/get-now"><span className="text-primary font-semibold cursor-pointer hover:underline">Get Now</span></Link></p>
          </div>

          {/* Qty + Buttons */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors" data-testid="qty-minus">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold" data-testid="qty-value">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors" data-testid="qty-plus">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-5">
            <button
              onClick={handleAddToCart}
              data-testid="btn-add-cart-detail"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5 transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <Link href="/checkout">
              <button
                data-testid="btn-buy-now-detail"
                className="flex-1 py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 px-8"
              >
                Buy Now
              </button>
            </Link>
            <button
              onClick={() => { toggleWishlist(product.id); toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist"); }}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-destructive text-destructive" : ""}`} />
            </button>
            <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Trust info */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Over $100" },
              { icon: Shield, label: "Secure Payment", sub: "100% Safe" },
              { icon: RefreshCcw, label: "Easy Returns", sub: "30 Days" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-foreground">{label}</span>
                <span className="text-[10px] text-muted-foreground">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-2 border-b border-border mb-6">
          {["description", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold capitalize border-b-2 transition-all -mb-px ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The {product.name} is a premium device from {product.brand}, offering exceptional performance and cutting-edge features. With {product.specs}, this product delivers everything you need for a seamless experience. Designed for those who demand the best, it combines style with functionality.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Whether you're a professional or an enthusiast, the {product.name} exceeds expectations at every turn. Experience the perfect blend of innovation and design.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-2">
            {[["Brand", product.brand], ["Category", product.category], ["Model", product.name], ["Specifications", product.specs], ["Rating", `${product.rating}/5`], ["Stock", `${product.stock} units`]].map(([key, val]) => (
              <div key={key} className="flex items-center py-2.5 border-b border-border/50">
                <span className="w-40 text-sm font-medium text-muted-foreground">{key}</span>
                <span className="flex-1 text-sm text-foreground">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-5xl font-black text-foreground">{product.rating}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{product.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs w-3 text-muted-foreground">{star}</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {["Great product, highly recommend!", "Excellent quality and fast delivery."].map((review, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">U{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Verified Customer</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground mb-5">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}

      {/* Mobile sticky buy bar */}
      <div className="fixed bottom-[72px] left-0 right-0 md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-4 py-3 z-30">
        <div className="flex gap-2">
          <button onClick={handleAddToCart} className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm">
            Add to Cart
          </button>
          <Link href="/checkout">
            <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm px-4">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
