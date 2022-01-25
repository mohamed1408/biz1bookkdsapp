import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, ToastAndroid, StyleSheet, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import KotCard from "../components/KotCard"
import { View } from '../components/Themed';
import { RootTabScreenProps, KOT } from '../types';
import api from '../utils/Api'
import { useConfig } from '../contexts/context'

const DATA = [
  {
    "KOTStatusId": 2,
    "Instruction": "",
    "KOTNo": 17,
    "ordername": 'Table: 1',
    "OrderId": 1695430,
    "Items": [
      {
        "DiscType": 1,
        "isorderitem": true,
        "showname": "BLACK FOREST/1 Kg+1/2 kg",
        "completed": false,
        "Id": 0,
        "CategoryId": 559,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "BLACK FOREST",
        "Product": "BLACK FOREST",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [
          {
            "Id": 66,
            "Name": "Cake-710",
            "OptionGroupType": 1,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 265,
                "DeliveryPrice": 370,
                "Name": "0.5 Kg",
                "Price": 370,
                "selected": false,
                "TakeawayPrice": 370,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 266,
                "DeliveryPrice": 710,
                "Name": "1 Kg+1/2 kg",
                "Price": 710,
                "selected": true,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 286,
                "DeliveryPrice": 710,
                "Name": "kg",
                "Price": 710,
                "selected": false,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 424,
                "DeliveryPrice": 1450,
                "Name": "kg(Fondant)",
                "Price": 1450,
                "selected": false,
                "TakeawayPrice": 1450,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              }
            ]
          },
          {
            "Id": 79,
            "Name": "Cake Charges ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 319,
                "DeliveryPrice": 300,
                "Name": "Photo Cake ",
                "Price": 300,
                "selected": false,
                "TakeawayPrice": 300,
                "IsSingleQtyOption": true,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 320,
                "DeliveryPrice": 100,
                "Name": "Eggless ",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 321,
                "DeliveryPrice": 150,
                "Name": "Shape ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 322,
                "DeliveryPrice": 150,
                "Name": "Drawing ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 323,
                "DeliveryPrice": 150,
                "Name": "Fruit Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 324,
                "DeliveryPrice": 150,
                "Name": "Choco Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              }
            ]
          },
          {
            "Id": 84,
            "Name": "Eggless ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 381,
                "DeliveryPrice": 50,
                "Name": "Rs:50",
                "Price": 50,
                "selected": false,
                "TakeawayPrice": 50,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 411,
                "DeliveryPrice": 100,
                "Name": "Rs:100",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              }
            ]
          }
        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 3365,
        "ProductKey": "3365_266",
        "Price": 0,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 0,
        "Tax2": 0,
        "Tax3": 0,
        "TaxGroupId": 6,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 710,
        "IsTaxInclusive": false,
        "TaxAmount1": 0,
        "TaxAmount2": 0,
        "TaxAmount3": 0,
        "TaxAmount": 0,
        "baseprice": 710,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:17",
        "refid": "8120211209/17:17:3365_266"
      }
    ],
    "CompanyId": 3,
    "StoreId": 4,
    "KOTGroupId": 12,
    "added": [
      {
        "DiscType": 1,
        "isorderitem": true,
        "showname": "BLACK FOREST/1 Kg+1/2 kg",
        "completed": false,
        "Id": 0,
        "CategoryId": 559,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "BLACK FOREST",
        "Product": "BLACK FOREST",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [
          {
            "Id": 66,
            "Name": "Cake-710",
            "OptionGroupType": 1,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 265,
                "DeliveryPrice": 370,
                "Name": "0.5 Kg",
                "Price": 370,
                "selected": false,
                "TakeawayPrice": 370,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 266,
                "DeliveryPrice": 710,
                "Name": "1 Kg+1/2 kg",
                "Price": 710,
                "selected": true,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 286,
                "DeliveryPrice": 710,
                "Name": "kg",
                "Price": 710,
                "selected": false,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 424,
                "DeliveryPrice": 1450,
                "Name": "kg(Fondant)",
                "Price": 1450,
                "selected": false,
                "TakeawayPrice": 1450,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              }
            ]
          },
          {
            "Id": 79,
            "Name": "Cake Charges ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 319,
                "DeliveryPrice": 300,
                "Name": "Photo Cake ",
                "Price": 300,
                "selected": false,
                "TakeawayPrice": 300,
                "IsSingleQtyOption": true,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 320,
                "DeliveryPrice": 100,
                "Name": "Eggless ",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 321,
                "DeliveryPrice": 150,
                "Name": "Shape ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 322,
                "DeliveryPrice": 150,
                "Name": "Drawing ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 323,
                "DeliveryPrice": 150,
                "Name": "Fruit Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 324,
                "DeliveryPrice": 150,
                "Name": "Choco Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              }
            ]
          },
          {
            "Id": 84,
            "Name": "Eggless ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 381,
                "DeliveryPrice": 50,
                "Name": "Rs:50",
                "Price": 50,
                "selected": false,
                "TakeawayPrice": 50,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              },
              {
                "Id": 411,
                "DeliveryPrice": 100,
                "Name": "Rs:100",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:17:3365_266"
              }
            ]
          }
        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 3365,
        "ProductKey": "3365_266",
        "Price": 0,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 0,
        "Tax2": 0,
        "Tax3": 0,
        "TaxGroupId": 6,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 710,
        "IsTaxInclusive": false,
        "TaxAmount1": 0,
        "TaxAmount2": 0,
        "TaxAmount3": 0,
        "TaxAmount": 0,
        "baseprice": 710,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:17",
        "refid": "8120211209/17:17:3365_266"
      }
    ],
    "removed": [

    ],
    "CreatedDate": "2021-12-09 07:43 PM",
    "DeliveryDateTime": "2022-01-13T17:00",
    "ModifiedDate": "2021-12-09 07:43 PM",
    "invoiceno": "8120211209/17",
    "time_left": "00:00",
    "ordertypeid": 4,
    "isprinted": true,
    "orderrefid": "8120211209/17",
    "refid": "8120211209/17:17"
  },
  {
    "KOTStatusId": 1,
    "Instruction": "",
    "KOTNo": 18,
    "ordername": 'TakeAway',
    "OrderId": 1695430,
    "Items": [
      {
        "DiscType": 1,
        "isorderitem": true,
        "showname": "BLACK FOREST/1 Kg+1/2 kg",
        "completed": false,
        "Id": 0,
        "CategoryId": 559,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "BLACK FOREST",
        "Product": null,
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [
          {
            "Id": 66,
            "Name": "Cake-710",
            "OptionGroupType": 1,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 265,
                "DeliveryPrice": 370,
                "Name": "0.5 Kg",
                "Price": 370,
                "selected": false,
                "TakeawayPrice": 370,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 266,
                "DeliveryPrice": 710,
                "Name": "1 Kg+1/2 kg",
                "Price": 710,
                "selected": true,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 286,
                "DeliveryPrice": 710,
                "Name": "kg",
                "Price": 710,
                "selected": false,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 424,
                "DeliveryPrice": 1450,
                "Name": "kg(Fondant)",
                "Price": 1450,
                "selected": false,
                "TakeawayPrice": 1450,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              }
            ]
          },
          {
            "Id": 79,
            "Name": "Cake Charges ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 319,
                "DeliveryPrice": 300,
                "Name": "Photo Cake ",
                "Price": 300,
                "selected": false,
                "TakeawayPrice": 300,
                "IsSingleQtyOption": true,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 320,
                "DeliveryPrice": 100,
                "Name": "Eggless ",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 321,
                "DeliveryPrice": 150,
                "Name": "Shape ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 322,
                "DeliveryPrice": 150,
                "Name": "Drawing ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 323,
                "DeliveryPrice": 150,
                "Name": "Fruit Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 324,
                "DeliveryPrice": 150,
                "Name": "Choco Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              }
            ]
          },
          {
            "Id": 84,
            "Name": "Eggless ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 381,
                "DeliveryPrice": 50,
                "Name": "Rs:50",
                "Price": 50,
                "selected": false,
                "TakeawayPrice": 50,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 411,
                "DeliveryPrice": 100,
                "Name": "Rs:100",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              }
            ]
          }
        ],
        "OrderDiscount": 0,
        "OrderId": 1695430,
        "ProductId": 3365,
        "ProductKey": "3365_266",
        "Price": 0,
        "Quantity": -1,
        "StatusId": 0,
        "Tax1": 0,
        "Tax2": 0,
        "Tax3": 0,
        "TaxGroupId": 6,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 0,
        "IsTaxInclusive": false,
        "TaxAmount1": 0,
        "TaxAmount2": 0,
        "TaxAmount3": 0,
        "TaxAmount": 0,
        "baseprice": 710,
        "kotquantity": 1,
        "kotrefid": "8120211209/17:18",
        "refid": "8120211209/17:18:3365_266"
      },
      {
        "DiscType": 1,
        "isorderitem": true,
        "showname": "BLACK FOREST/1 Kg+1/2 kg+Rs:100",
        "completed": false,
        "Id": 0,
        "CategoryId": 559,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "BLACK FOREST",
        "Product": null,
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [
          {
            "Id": 66,
            "Name": "Cake-710",
            "OptionGroupType": 1,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 265,
                "DeliveryPrice": 370,
                "Name": "0.5 Kg",
                "Price": 370,
                "selected": false,
                "TakeawayPrice": 370,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 266,
                "DeliveryPrice": 710,
                "Name": "1 Kg+1/2 kg",
                "Price": 710,
                "selected": true,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 286,
                "DeliveryPrice": 710,
                "Name": "kg",
                "Price": 710,
                "selected": false,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 424,
                "DeliveryPrice": 1450,
                "Name": "kg(Fondant)",
                "Price": 1450,
                "selected": false,
                "TakeawayPrice": 1450,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              }
            ]
          },
          {
            "Id": 79,
            "Name": "Cake Charges ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 319,
                "DeliveryPrice": 300,
                "Name": "Photo Cake ",
                "Price": 300,
                "selected": false,
                "TakeawayPrice": 300,
                "IsSingleQtyOption": true,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 320,
                "DeliveryPrice": 100,
                "Name": "Eggless ",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 321,
                "DeliveryPrice": 150,
                "Name": "Shape ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 322,
                "DeliveryPrice": 150,
                "Name": "Drawing ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 323,
                "DeliveryPrice": 150,
                "Name": "Fruit Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 324,
                "DeliveryPrice": 150,
                "Name": "Choco Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              }
            ]
          },
          {
            "Id": 84,
            "Name": "Eggless ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 381,
                "DeliveryPrice": 50,
                "Name": "Rs:50",
                "Price": 50,
                "selected": false,
                "TakeawayPrice": 50,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 411,
                "DeliveryPrice": 100,
                "Name": "Rs:100",
                "Price": 100,
                "selected": true,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              }
            ]
          }
        ],
        "OrderDiscount": 0,
        "OrderId": 1695430,
        "ProductId": 3365,
        "ProductKey": "3365_266_411",
        "Price": 0,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 0,
        "Tax2": 0,
        "Tax3": 0,
        "TaxGroupId": 6,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 810,
        "IsTaxInclusive": false,
        "TaxAmount1": 0,
        "TaxAmount2": 0,
        "TaxAmount3": 0,
        "TaxAmount": 0,
        "baseprice": 810,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:18",
        "refid": "8120211209/17:18:3365_266_411"
      }
    ],
    "CompanyId": 3,
    "StoreId": 4,
    "KOTGroupId": 12,
    "added": [
      {
        "DiscType": 1,
        "isorderitem": true,
        "showname": "BLACK FOREST/1 Kg+1/2 kg+Rs:100",
        "completed": false,
        "Id": 0,
        "CategoryId": 559,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "BLACK FOREST",
        "Product": "BLACK FOREST",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [
          {
            "Id": 66,
            "Name": "Cake-710",
            "OptionGroupType": 1,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 265,
                "DeliveryPrice": 370,
                "Name": "0.5 Kg",
                "Price": 370,
                "selected": false,
                "TakeawayPrice": 370,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 266,
                "DeliveryPrice": 710,
                "Name": "1 Kg+1/2 kg",
                "Price": 710,
                "selected": true,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 286,
                "DeliveryPrice": 710,
                "Name": "kg",
                "Price": 710,
                "selected": false,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 424,
                "DeliveryPrice": 1450,
                "Name": "kg(Fondant)",
                "Price": 1450,
                "selected": false,
                "TakeawayPrice": 1450,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              }
            ]
          },
          {
            "Id": 79,
            "Name": "Cake Charges ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 319,
                "DeliveryPrice": 300,
                "Name": "Photo Cake ",
                "Price": 300,
                "selected": false,
                "TakeawayPrice": 300,
                "IsSingleQtyOption": true,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 320,
                "DeliveryPrice": 100,
                "Name": "Eggless ",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 321,
                "DeliveryPrice": 150,
                "Name": "Shape ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 322,
                "DeliveryPrice": 150,
                "Name": "Drawing ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 323,
                "DeliveryPrice": 150,
                "Name": "Fruit Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 324,
                "DeliveryPrice": 150,
                "Name": "Choco Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              }
            ]
          },
          {
            "Id": 84,
            "Name": "Eggless ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 381,
                "DeliveryPrice": 50,
                "Name": "Rs:50",
                "Price": 50,
                "selected": false,
                "TakeawayPrice": 50,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              },
              {
                "Id": 411,
                "DeliveryPrice": 100,
                "Name": "Rs:100",
                "Price": 100,
                "selected": true,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266_411"
              }
            ]
          }
        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 3365,
        "ProductKey": "3365_266_411",
        "Price": 0,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 0,
        "Tax2": 0,
        "Tax3": 0,
        "TaxGroupId": 6,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 810,
        "IsTaxInclusive": false,
        "TaxAmount1": 0,
        "TaxAmount2": 0,
        "TaxAmount3": 0,
        "TaxAmount": 0,
        "baseprice": 810,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:18",
        "refid": "8120211209/17:18:3365_266_411"
      }
    ],
    "removed": [
      {
        "DiscType": 1,
        "isorderitem": true,
        "showname": "BLACK FOREST/1 Kg+1/2 kg",
        "completed": false,
        "Id": 0,
        "CategoryId": 559,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "BLACK FOREST",
        "Product": "BLACK FOREST",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [
          {
            "Id": 66,
            "Name": "Cake-710",
            "OptionGroupType": 1,
            "SortOrder": -1,
            "selected": true,
            "Option": [
              {
                "Id": 265,
                "DeliveryPrice": 370,
                "Name": "0.5 Kg",
                "Price": 370,
                "selected": false,
                "TakeawayPrice": 370,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 266,
                "DeliveryPrice": 710,
                "Name": "1 Kg+1/2 kg",
                "Price": 710,
                "selected": true,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 286,
                "DeliveryPrice": 710,
                "Name": "kg",
                "Price": 710,
                "selected": false,
                "TakeawayPrice": 710,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 424,
                "DeliveryPrice": 1450,
                "Name": "kg(Fondant)",
                "Price": 1450,
                "selected": false,
                "TakeawayPrice": 1450,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              }
            ]
          },
          {
            "Id": 79,
            "Name": "Cake Charges ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 319,
                "DeliveryPrice": 300,
                "Name": "Photo Cake ",
                "Price": 300,
                "selected": false,
                "TakeawayPrice": 300,
                "IsSingleQtyOption": true,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 320,
                "DeliveryPrice": 100,
                "Name": "Eggless ",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 321,
                "DeliveryPrice": 150,
                "Name": "Shape ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 322,
                "DeliveryPrice": 150,
                "Name": "Drawing ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 323,
                "DeliveryPrice": 150,
                "Name": "Fruit Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 324,
                "DeliveryPrice": 150,
                "Name": "Choco Dec ",
                "Price": 150,
                "selected": false,
                "TakeawayPrice": 150,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              }
            ]
          },
          {
            "Id": 84,
            "Name": "Eggless ",
            "OptionGroupType": 2,
            "SortOrder": -1,
            "Option": [
              {
                "Id": 381,
                "DeliveryPrice": 50,
                "Name": "Rs:50",
                "Price": 50,
                "selected": false,
                "TakeawayPrice": 50,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              },
              {
                "Id": 411,
                "DeliveryPrice": 100,
                "Name": "Rs:100",
                "Price": 100,
                "selected": false,
                "TakeawayPrice": 100,
                "IsSingleQtyOption": false,
                "orderitemrefid": "8120211209/17:18:3365_266"
              }
            ]
          }
        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 3365,
        "ProductKey": "3365_266",
        "Price": 0,
        "Quantity": -1,
        "StatusId": 0,
        "Tax1": 0,
        "Tax2": 0,
        "Tax3": 0,
        "TaxGroupId": 6,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 0,
        "IsTaxInclusive": false,
        "TaxAmount1": 0,
        "TaxAmount2": 0,
        "TaxAmount3": 0,
        "TaxAmount": 0,
        "baseprice": 710,
        "kotquantity": 1,
        "kotrefid": "8120211209/17:18",
        "refid": "8120211209/17:18:3365_266"
      }
    ],
    "CreatedDate": "2021-12-09 07:43 PM",
    "DeliveryDateTime": "2022-01-13T17:00",
    "ModifiedDate": "2021-12-09 07:43 PM",
    "invoiceno": "8120211209/17",
    "time_left": "00:00",
    "ordertypeid": 4,
    "isprinted": true,
    "orderrefid": "8120211209/17",
    "refid": "8120211209/17:18"
  },
  {
    "KOTStatusId": 3,
    "Instruction": "",
    "KOTNo": 65,
    "ordername": 'Dine In',
    "OrderId": 1695430,
    "Items": [
      {
        "isorderitem": true,
        "showname": "SNOW SPRAY",
        "completed": false,
        "Id": 0,
        "CategoryId": 48,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "SNOW SPRAY",
        "Product": null,
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [

        ],
        "OrderDiscount": 0,
        "OrderId": 1695430,
        "ProductId": 634,
        "ProductKey": "634",
        "Price": 57.14,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 2.5,
        "Tax2": 2.5,
        "Tax3": 0,
        "TaxGroupId": 8,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 57.14,
        "IsTaxInclusive": false,
        "TaxAmount1": 1.4284999999999999,
        "TaxAmount2": 1.4284999999999999,
        "TaxAmount3": 0,
        "TaxAmount": 2.8569999999999998,
        "baseprice": 57.14,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:65",
        "refid": "8120211209/17:65:634"
      },
      {
        "isorderitem": true,
        "showname": "MUSIC CANDLE",
        "completed": false,
        "Id": 0,
        "CategoryId": 48,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "MUSIC CANDLE",
        "Product": null,
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [

        ],
        "OrderDiscount": 0,
        "OrderId": 1695430,
        "ProductId": 632,
        "ProductKey": "632",
        "Price": 57.14,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 2.5,
        "Tax2": 2.5,
        "Tax3": 0,
        "TaxGroupId": 8,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 57.14,
        "IsTaxInclusive": false,
        "TaxAmount1": 1.4284999999999999,
        "TaxAmount2": 1.4284999999999999,
        "TaxAmount3": 0,
        "TaxAmount": 2.8569999999999998,
        "baseprice": 57.14,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:65",
        "refid": "8120211209/17:65:632"
      },
      {
        "isorderitem": true,
        "showname": "POPPER RS 60",
        "completed": false,
        "Id": 0,
        "CategoryId": 48,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "POPPER RS 60",
        "Product": null,
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [

        ],
        "OrderDiscount": 0,
        "OrderId": 1695430,
        "ProductId": 630,
        "ProductKey": "630",
        "Price": 57.14,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 2.5,
        "Tax2": 2.5,
        "Tax3": 0,
        "TaxGroupId": 8,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 57.14,
        "IsTaxInclusive": false,
        "TaxAmount1": 1.4284999999999999,
        "TaxAmount2": 1.4284999999999999,
        "TaxAmount3": 0,
        "TaxAmount": 2.8569999999999998,
        "baseprice": 57.14,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:65",
        "refid": "8120211209/17:65:630"
      }
    ],
    "CompanyId": 3,
    "StoreId": 4,
    "KOTGroupId": 12,
    "added": [
      {
        "isorderitem": true,
        "showname": "SNOW SPRAY",
        "completed": false,
        "Id": 0,
        "CategoryId": 48,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "SNOW SPRAY",
        "Product": "SNOW SPRAY",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [

        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 634,
        "ProductKey": "634",
        "Price": 57.14,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 2.5,
        "Tax2": 2.5,
        "Tax3": 0,
        "TaxGroupId": 8,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 57.14,
        "IsTaxInclusive": false,
        "TaxAmount1": 1.4284999999999999,
        "TaxAmount2": 1.4284999999999999,
        "TaxAmount3": 0,
        "TaxAmount": 2.8569999999999998,
        "baseprice": 57.14,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:65",
        "refid": "8120211209/17:65:634"
      },
      {
        "isorderitem": true,
        "showname": "MUSIC CANDLE",
        "completed": false,
        "Id": 0,
        "CategoryId": 48,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "MUSIC CANDLE",
        "Product": "MUSIC CANDLE",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [

        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 632,
        "ProductKey": "632",
        "Price": 57.14,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 2.5,
        "Tax2": 2.5,
        "Tax3": 0,
        "TaxGroupId": 8,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 57.14,
        "IsTaxInclusive": false,
        "TaxAmount1": 1.4284999999999999,
        "TaxAmount2": 1.4284999999999999,
        "TaxAmount3": 0,
        "TaxAmount": 2.8569999999999998,
        "baseprice": 57.14,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:65",
        "refid": "8120211209/17:65:632"
      },
      {
        "isorderitem": true,
        "showname": "POPPER RS 60",
        "completed": false,
        "Id": 0,
        "CategoryId": 48,
        "ComplementryQty": 0,
        "MinimumQty": 0,
        "DiscAmount": 0,
        "DiscPercent": 0,
        "Extra": 0,
        "FreeQtyPercentage": 0,
        "ItemDiscount": 0,
        "KitchenUserId": null,
        "KOTGroupId": 12,
        "KOTId": 0,
        "Message": "",
        "Name": "POPPER RS 60",
        "Product": "POPPER RS 60",
        "Note": "",
        "OptionJson": "",
        "OptionGroup": [

        ],
        "OrderDiscount": 0,
        "OrderId": 0,
        "ProductId": 630,
        "ProductKey": "630",
        "Price": 57.14,
        "Quantity": 1,
        "StatusId": 0,
        "Tax1": 2.5,
        "Tax2": 2.5,
        "Tax3": 0,
        "TaxGroupId": 8,
        "TaxItemDiscount": 0,
        "TaxOrderDiscount": 0,
        "TotalAmount": 57.14,
        "IsTaxInclusive": false,
        "TaxAmount1": 1.4284999999999999,
        "TaxAmount2": 1.4284999999999999,
        "TaxAmount3": 0,
        "TaxAmount": 2.8569999999999998,
        "baseprice": 57.14,
        "kotquantity": 0,
        "kotrefid": "8120211209/17:65",
        "refid": "8120211209/17:65:630"
      }
    ],
    "removed": [

    ],
    "CreatedDate": "2021-12-09 07:43 PM",
    "DeliveryDateTime": "2022-01-13T17:00",
    "ModifiedDate": "2021-12-09 07:43 PM",
    "invoiceno": "8120211209/17",
    "time_left": "00:00",
    "ordertypeid": 4,
    "isprinted": true,
    "orderrefid": "8120211209/17",
    "refid": "8120211209/17:65"
  }
]
const kot = {
  "KOTStatusId": 1,
  "Instruction": "",
  "KOTNo": 17,
  "ordername": 'PickUp',
  "OrderId": 1695430,
  "Items": [
    {
      "DiscType": 1,
      "isorderitem": true,
      "showname": "BLACK FOREST/1 Kg+1/2 kg",
      "completed": false,
      "Id": 0,
      "CategoryId": 559,
      "ComplementryQty": 0,
      "MinimumQty": 0,
      "DiscAmount": 0,
      "DiscPercent": 0,
      "Extra": 0,
      "FreeQtyPercentage": 0,
      "ItemDiscount": 0,
      "KitchenUserId": null,
      "KOTGroupId": 12,
      "KOTId": 0,
      "Message": "",
      "Name": "BLACK FOREST",
      "Product": "BLACK FOREST",
      "Note": "",
      "OptionJson": "",
      "OptionGroup": [
        {
          "Id": 66,
          "Name": "Cake-710",
          "OptionGroupType": 1,
          "SortOrder": -1,
          "selected": true,
          "Option": [
            {
              "Id": 265,
              "DeliveryPrice": 370,
              "Name": "0.5 Kg",
              "Price": 370,
              "selected": false,
              "TakeawayPrice": 370,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 266,
              "DeliveryPrice": 710,
              "Name": "1 Kg+1/2 kg",
              "Price": 710,
              "selected": true,
              "TakeawayPrice": 710,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 286,
              "DeliveryPrice": 710,
              "Name": "kg",
              "Price": 710,
              "selected": false,
              "TakeawayPrice": 710,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 424,
              "DeliveryPrice": 1450,
              "Name": "kg(Fondant)",
              "Price": 1450,
              "selected": false,
              "TakeawayPrice": 1450,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            }
          ]
        },
        {
          "Id": 79,
          "Name": "Cake Charges ",
          "OptionGroupType": 2,
          "SortOrder": -1,
          "Option": [
            {
              "Id": 319,
              "DeliveryPrice": 300,
              "Name": "Photo Cake ",
              "Price": 300,
              "selected": false,
              "TakeawayPrice": 300,
              "IsSingleQtyOption": true,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 320,
              "DeliveryPrice": 100,
              "Name": "Eggless ",
              "Price": 100,
              "selected": false,
              "TakeawayPrice": 100,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 321,
              "DeliveryPrice": 150,
              "Name": "Shape ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 322,
              "DeliveryPrice": 150,
              "Name": "Drawing ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 323,
              "DeliveryPrice": 150,
              "Name": "Fruit Dec ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 324,
              "DeliveryPrice": 150,
              "Name": "Choco Dec ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            }
          ]
        },
        {
          "Id": 84,
          "Name": "Eggless ",
          "OptionGroupType": 2,
          "SortOrder": -1,
          "Option": [
            {
              "Id": 381,
              "DeliveryPrice": 50,
              "Name": "Rs:50",
              "Price": 50,
              "selected": false,
              "TakeawayPrice": 50,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 411,
              "DeliveryPrice": 100,
              "Name": "Rs:100",
              "Price": 100,
              "selected": false,
              "TakeawayPrice": 100,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            }
          ]
        }
      ],
      "OrderDiscount": 0,
      "OrderId": 0,
      "ProductId": 3365,
      "ProductKey": "3365_266",
      "Price": 0,
      "Quantity": 1,
      "StatusId": 0,
      "Tax1": 0,
      "Tax2": 0,
      "Tax3": 0,
      "TaxGroupId": 6,
      "TaxItemDiscount": 0,
      "TaxOrderDiscount": 0,
      "TotalAmount": 710,
      "IsTaxInclusive": false,
      "TaxAmount1": 0,
      "TaxAmount2": 0,
      "TaxAmount3": 0,
      "TaxAmount": 0,
      "baseprice": 710,
      "kotquantity": 0,
      "kotrefid": "8120211209/17:17",
      "refid": "8120211209/17:17:3365_266"
    }
  ],
  "CompanyId": 3,
  "StoreId": 4,
  "KOTGroupId": 12,
  "added": [
    {
      "DiscType": 1,
      "isorderitem": true,
      "showname": "BLACK FOREST/1 Kg+1/2 kg",
      "completed": false,
      "Id": 0,
      "CategoryId": 559,
      "ComplementryQty": 0,
      "MinimumQty": 0,
      "DiscAmount": 0,
      "DiscPercent": 0,
      "Extra": 0,
      "FreeQtyPercentage": 0,
      "ItemDiscount": 0,
      "KitchenUserId": null,
      "KOTGroupId": 12,
      "KOTId": 0,
      "Message": "",
      "Name": "BLACK FOREST",
      "Product": "BLACK FOREST",
      "Note": "",
      "OptionJson": "",
      "OptionGroup": [
        {
          "Id": 66,
          "Name": "Cake-710",
          "OptionGroupType": 1,
          "SortOrder": -1,
          "selected": true,
          "Option": [
            {
              "Id": 265,
              "DeliveryPrice": 370,
              "Name": "0.5 Kg",
              "Price": 370,
              "selected": false,
              "TakeawayPrice": 370,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 266,
              "DeliveryPrice": 710,
              "Name": "1 Kg+1/2 kg",
              "Price": 710,
              "selected": true,
              "TakeawayPrice": 710,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 286,
              "DeliveryPrice": 710,
              "Name": "kg",
              "Price": 710,
              "selected": false,
              "TakeawayPrice": 710,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 424,
              "DeliveryPrice": 1450,
              "Name": "kg(Fondant)",
              "Price": 1450,
              "selected": false,
              "TakeawayPrice": 1450,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            }
          ]
        },
        {
          "Id": 79,
          "Name": "Cake Charges ",
          "OptionGroupType": 2,
          "SortOrder": -1,
          "Option": [
            {
              "Id": 319,
              "DeliveryPrice": 300,
              "Name": "Photo Cake ",
              "Price": 300,
              "selected": false,
              "TakeawayPrice": 300,
              "IsSingleQtyOption": true,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 320,
              "DeliveryPrice": 100,
              "Name": "Eggless ",
              "Price": 100,
              "selected": false,
              "TakeawayPrice": 100,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 321,
              "DeliveryPrice": 150,
              "Name": "Shape ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 322,
              "DeliveryPrice": 150,
              "Name": "Drawing ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 323,
              "DeliveryPrice": 150,
              "Name": "Fruit Dec ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 324,
              "DeliveryPrice": 150,
              "Name": "Choco Dec ",
              "Price": 150,
              "selected": false,
              "TakeawayPrice": 150,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            }
          ]
        },
        {
          "Id": 84,
          "Name": "Eggless ",
          "OptionGroupType": 2,
          "SortOrder": -1,
          "Option": [
            {
              "Id": 381,
              "DeliveryPrice": 50,
              "Name": "Rs:50",
              "Price": 50,
              "selected": false,
              "TakeawayPrice": 50,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            },
            {
              "Id": 411,
              "DeliveryPrice": 100,
              "Name": "Rs:100",
              "Price": 100,
              "selected": false,
              "TakeawayPrice": 100,
              "IsSingleQtyOption": false,
              "orderitemrefid": "8120211209/17:17:3365_266"
            }
          ]
        }
      ],
      "OrderDiscount": 0,
      "OrderId": 0,
      "ProductId": 3365,
      "ProductKey": "3365_266",
      "Price": 0,
      "Quantity": 1,
      "StatusId": 0,
      "Tax1": 0,
      "Tax2": 0,
      "Tax3": 0,
      "TaxGroupId": 6,
      "TaxItemDiscount": 0,
      "TaxOrderDiscount": 0,
      "TotalAmount": 710,
      "IsTaxInclusive": false,
      "TaxAmount1": 0,
      "TaxAmount2": 0,
      "TaxAmount3": 0,
      "TaxAmount": 0,
      "baseprice": 710,
      "kotquantity": 0,
      "kotrefid": "8120211209/17:17",
      "refid": "8120211209/17:17:3365_266"
    }
  ],
  "removed": [

  ],
  "CreatedDate": "2021-12-09 07:43 PM",
  "DeliveryDateTime": "2022-01-13T17:00",
  "ModifiedDate": "2021-12-09 07:43 PM",
  "invoiceno": "2220211209/17",
  "time_left": "00:00",
  "ordertypeid": 4,
  "isprinted": true,
  "orderrefid": "2220211209/17",
  "refid": "2220211209/17:17"
}

const colors = {
  'green': '#389b3a',
  'black': '#222222',
  'yellow': '#eeaa00',
  'red': '#f24e40'
}

export default function KitchenDisplayScreen({ navigation }: RootTabScreenProps<'KitchenDisplay'>) {

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable
  //         // onPress={() => setShowFloors(true)}
  //         style={({ pressed }) => ({
  //           opacity: pressed ? 0.5 : 1,
  //         })}>
  //         <MaterialIcons
  //           name="menu"
  //           size={25}
  //           color={'#2f95dc'}
  //           style={{ marginRight: 15 }}
  //         />
  //       </Pressable>
  //     )
  //   })
  // })

  const _kots: KOT[] = []

  const { config, setConfig } = useConfig()

  const [KOTS, setKOTS] = useState(_kots);
  const [update_helper, indicateUpdate] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState(0);

  useEffect(() => {
    setConfig({ ...config, indicator: !config.indicator })
    socketConfig()
    getKots()
  }, []);

  const notify = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getKots = () => {
    api.getkots(new URL('getKots', config.url).href, config.KOTGroupId).then(response => {
      setKOTS(response.data.kots.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
    }, error => {
      console.log(error, new URL('getdbdata', config.url).href)
    })
  }

  const compare = (a: number, b: number) => {
    return (a - b) * Math.abs((a - b))
  }

  const socketConfig = () => {
    console.log("configuring socket events...")
    config.socket.off("kot:new").on("kot:new", onNewKot)
  }

  const onNewKot = (payload: any) => {
    console.log(payload)
    if (payload.KOTGroupId == config.KOTGroupId) {
      getKots()
      notify("New KOT!")
    }
  }

  const changeStatus = (statusId: number, refid: string) => {
    let _kots = KOTS
    _kots.filter(x => x.refid == refid)[0].KOTStatusId = statusId
    setKOTS(_kots)
    indicateUpdate(!update_helper)
    config.socket.emit("kot:statusChange", { refid: refid, KOTStatusId: statusId })
  }

  const changeItemStatus = (kotrefid: string, product_key: string, completed: boolean) => {
    let _kots = KOTS
    _kots.filter(x => x.refid == kotrefid)[0].Items.filter((x: any) => x.ProductKey == product_key)[0].completed = !completed
    setKOTS(_kots)
    indicateUpdate(!update_helper)
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    api.getkots(new URL('getKots', config.url).href, config.KOTGroupId).then(response => {
      console.log(config.KOTGroupId, config.KOTGroup)
      setKOTS(response.data.kots.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
      setRefreshing(false)
    }, error => {
      setRefreshing(false)
    })
  }, []);

  const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  return (
    <View style={styles.container} >
      <View style={{ position: 'absolute', zIndex: 1000, top: 0, width: '100%' }}>
        <Picker
          selectedValue={statusFilter.toString()}
          mode='dropdown'
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue, typeof itemValue)
            setStatusFilter(+itemValue)
          }}>
          <Picker.Item label="All" value="0" />
          <Picker.Item label="Pending" value="1" />
          <Picker.Item label="Completed" value="3" />
        </Picker>
      </View>
      <FlatList
        style={{ width: '100%', top: 35, marginBottom: 35 }}
        data={KOTS.filter(x => statusFilter == 0 || x.KOTStatusId == statusFilter)}
        snapToAlignment='start'
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        renderItem={({ item, index }) => <KotCard key={index} kot={item} changestatus={changeStatus} changeItemStatus={changeItemStatus} update_helper={update_helper} />}
        keyExtractor={item => create_UUID()}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    padding: 20,
  },
  card: {
    padding: 20,
    borderWidth: 0,
    borderRadius: 5,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row'
  },
  carHeaderLeft: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
  },
  carHeaderRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cardBody: {

  },
  cardFooter: {
    flexDirection: 'row'
  },
  carFooterLeft: {
    flex: 1,
    fontWeight: 'bold',
  },
  carFooterRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});