import Cart from "./cart/cart";
import CartProduct from "./cart_product/cartProduct";
import FavouriteProduct from "./favourite/favourite";
import NotificationAccount from "./notification/notificationAccount";
import OrderProduct from "./order_product/orderProduct";
import Product from "./product/product";
import ProductCategory from "./product_category/productCategory";
import ProductIngredients from "./product_ingredients/productIngredients";
import ProductSize from "./product_size/productSize";
import ProductSubCategory from "./product_sub_category/productSubCategory";
import ProductTag from "./product_tag/productTag";
import RatingProduct from "./rating_product/ratingProduct";
import ReportAccount from "./report_account/reportAccount";
import ReportAccountDetail from "./report_account_detail/reportAccountDetail";
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

const ACCOUNT_STATUS = `#graphql
enum AccountStatus {
   BANNED
   NONE
   WARNING
}
`;
const REPORT_STATUS = `#graphql
enum ReportStatus {
  DONE
  READ
  UN_READ
}
`;

const NOTI_STATUS = `#graphql
enum NotiStatus {
  READ
  UN_READ
}
`;

export const typeDefs = `#graphql
   ${ROLE}
   ${ORDER_STATUS}
   ${ACCOUNT_STATUS}
   ${REPORT_STATUS}
   ${NOTI_STATUS}
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
   ${RatingProduct.typeDef()}
   ${FavouriteProduct.typeDef()}
   ${ReportAccount.typeDef()}
   ${ReportAccountDetail.typeDef()}
   ${NotificationAccount.typeDef()}
   ${ProductIngredients.typeDef()}
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
      ${RatingProduct.query()}
      ${FavouriteProduct.query()}
      ${ReportAccount.query()}
      ${ReportAccountDetail.query()}
      ${NotificationAccount.query()}
      ${ProductIngredients.query()}

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
       ${RatingProduct.mutation()}
       ${FavouriteProduct.mutation()}
       ${ReportAccount.mutation()}
       ${ReportAccountDetail.mutation()}
       ${NotificationAccount.mutation()}
      ${ProductIngredients.mutation()}

   }           
`;
