/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Camera: undefined;
  Login: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  More: undefined;
  KitchenDisplay: undefined;
};

export type KOTGroup = {
  Id: number;
  KOTGroupId: number;
  StoreId: number;
  CompanyId: number;
  Description: string;
};

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type KOT = {
  KOTStatusId: number;
  Instruction: string;
  KOTNo: number;
  OrderId: null;
  Items: (Items)[];
  CompanyId: number;
  StoreId: number;
  KOTGroupId: number;
  added: (Items)[];
  removed: (Items)[];
  CreatedDate: string;
  ModifiedDate: string;
  invoiceno: string;
  ordertypeid: number;
  refid: string;
  _id: string;
}
export type Items = {
  DiscType: number;
  isorderitem: boolean;
  showname: string;
  Id: number;
  CategoryId: number;
  ComplementryQty: number;
  MinimumQty: number;
  DiscAmount: number;
  DiscPercent: number;
  Extra: number;
  FreeQtyPercentage: number;
  ItemDiscount: number;
  KitchenUserId: null;
  KOTGroupId: number;
  KOTId: number;
  Message: string;
  Name: string;
  Product: string;
  Note: string;
  OptionJson: string;
  OptionGroup: (OptionGroup)[];
  OrderDiscount: number;
  OrderId: number;
  ProductId: number;
  ProductKey: string;
  Price: number;
  Quantity: number;
  StatusId: number;
  Tax1: number;
  Tax2: number;
  Tax3: number;
  TaxGroupId: number;
  TaxItemDiscount: number;
  TaxOrderDiscount: number;
  TotalAmount: number;
  IsTaxInclusive: boolean;
  TaxAmount1: number;
  TaxAmount2: number;
  TaxAmount3: number;
  TaxAmount: number;
  baseprice: number;
  kotquantity: number;
  completed: boolean;
}
export type OptionGroup = {
  Id: number;
  Name: string;
  OptionGroupType: number;
  SortOrder: number;
  selected: boolean;
  Option: (Option)[];
}
export type Option = {
  Id: number;
  DeliveryPrice: number;
  Name: string;
  Price: number;
  selected: boolean;
  TakeawayPrice: number;
  IsSingleQtyOption: boolean;
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
