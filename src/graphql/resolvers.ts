import Cart from "./cart/cart";
import CartProduct from "./cart_product/cartProduct";
import Order from "./order/order";
import OrderProduct from "./order_product/orderProduct";
import Product from "./product/product";
import ProductCategory from "./product_category/productCategory";
import ProductSize from "./product_size/productSize";
import ProductSubCategory from "./product_sub_category/productSubCategory";
import ProductTag from "./product_tag/productTag";
import Shop from "./shop/shop";
import User from "./user/user";
import UserAccount from "./user_account/userAccount";

export const enum RESOLVER_TYPE {
  Query,
  Mutation,
}

export const resolvers = {
  Query: {
    ...UserAccount.resolver(RESOLVER_TYPE.Query),
    ...User.resolver(RESOLVER_TYPE.Query),
    ...Product.resolver(RESOLVER_TYPE.Query),
    ...ProductSubCategory.resolver(RESOLVER_TYPE.Query),
    ...ProductCategory.resolver(RESOLVER_TYPE.Query),
    ...Shop.resolver(RESOLVER_TYPE.Query),
    ...ProductSize.resolver(RESOLVER_TYPE.Query),
    ...ProductTag.resolver(RESOLVER_TYPE.Query),
    ...CartProduct.resolver(RESOLVER_TYPE.Query),
    ...Cart.resolver(RESOLVER_TYPE.Query),
    ...Order.resolver(RESOLVER_TYPE.Query),
    ...OrderProduct.resolver(RESOLVER_TYPE.Query),
  },
  Mutation: {
    ...UserAccount.resolver(RESOLVER_TYPE.Mutation),
    ...User.resolver(RESOLVER_TYPE.Mutation),
    ...Product.resolver(RESOLVER_TYPE.Mutation),
    ...ProductSubCategory.resolver(RESOLVER_TYPE.Mutation),
    ...ProductCategory.resolver(RESOLVER_TYPE.Mutation),
    ...Shop.resolver(RESOLVER_TYPE.Mutation),
    ...ProductSize.resolver(RESOLVER_TYPE.Mutation),
    ...ProductTag.resolver(RESOLVER_TYPE.Mutation),
    ...CartProduct.resolver(RESOLVER_TYPE.Mutation),
    ...Cart.resolver(RESOLVER_TYPE.Mutation),
    ...Order.resolver(RESOLVER_TYPE.Mutation),
    ...OrderProduct.resolver(RESOLVER_TYPE.Mutation),
  },
};
