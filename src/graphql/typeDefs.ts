import Cart from "./cart/cart";
import CartProduct from "./cart_product/cartProduct";
import OrderProduct from "./order_product/orderProduct";
import Product from "./product/product";
import ProductCategory from "./product_category/productCategory";
import ProductSize from "./product_size/productSize";
import ProductSubCategory from "./product_sub_category/productSubCategory";
import ProductTag from "./product_tag/productTag";
import Shop from "./shop/shop";
import User from "./user/user";
import UserAccount from "./user_account/userAccount";

const ROLE = `#graphql
enum Role {
   USER
   ADMIN
   SHOP_OWNER
}
`;

const ORDER_STATUS = `#graphql
enum OrderStatus {
   PENDING
   ON_THE_WAY
   DELIVERED
   CANCELED
}
`;

export const typeDefs = `#graphql
   ${ROLE}
   ${ORDER_STATUS}
   ${UserAccount.typeDef()}
   ${User.typeDef()}
   ${Product.typeDef()}
   ${ProductSubCategory.typeDef()}
   ${ProductCategory.typeDef()}
   ${Shop.typeDef()}
   ${ProductSize.typeDef()}
   ${ProductTag.typeDef()}
   ${CartProduct.typeDef()}
   ${Cart.typeDef()}
   ${OrderProduct.typeDef()}

   type ID {
      id: String
   }
            
   type Query {
      ${UserAccount.query()}
      ${User.query()}
      ${Product.query()}
      ${ProductSubCategory.query()}
      ${ProductCategory.query()}
      ${Shop.query()}
      ${ProductSize.query()}
      ${ProductTag.query()}
      ${CartProduct.query()}
      ${Cart.query()}
      ${OrderProduct.query()}
   }

   type Mutation {
       ${UserAccount.mutation()}
       ${User.mutation()}
       ${Product.mutation()}
       ${ProductSubCategory.mutation()}
       ${ProductCategory.mutation()}
       ${Shop.mutation()}
       ${ProductSize.mutation()}
       ${ProductTag.mutation()}
       ${CartProduct.mutation()}
       ${Cart.mutation()}
       ${OrderProduct.mutation()}
   }           
`;
