import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Book } from "./book";

type RootStackParamList = {
    Home: undefined;
    ResetPassword: undefined;
    ResetPasswordConfirm: undefined;
    Login: undefined;
    Signup: undefined;
    BookDetails: { book: Book };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type ResetPasswordScreenRouteProp = RouteProp<
    RootStackParamList,
    "ResetPassword"
>;
type ResetPasswordScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ResetPassword"
>;

type ResetPasswordConfirmScreenRouteProp = RouteProp<
    RootStackParamList,
    "ResetPasswordConfirm"
>;
type ResetPasswordConfirmScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ResetPasswordConfirm"
>;

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Login"
>;

type SignupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Signup"
>;

type BookDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "BookDetails"
>;

type BookDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BookDetails"
>;

type BookDetailsScreenProps = {
  route: BookDetailsScreenRouteProp;
  navigation: BookDetailsScreenNavigationProp;
};


export {
    RootStackParamList,
    HomeScreenRouteProp,
    LoginScreenNavigationProp,
    HomeScreenNavigationProp,
    ResetPasswordScreenRouteProp,
    ResetPasswordScreenNavigationProp,
    ResetPasswordConfirmScreenRouteProp,
    ResetPasswordConfirmScreenNavigationProp,
    SignupScreenNavigationProp,
    BookDetailsScreenProps
};
