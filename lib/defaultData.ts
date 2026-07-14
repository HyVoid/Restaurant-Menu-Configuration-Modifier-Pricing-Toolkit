import { WorkbookState } from "./types";

export const defaultWorkbookState: WorkbookState = {
  sysParams: {
    VAL_HALF_FACTOR: "0.50",
    VAL_EXTRA_MULT: "1.50",
    VAL_XXTRA_MULT: "2.00",
    VAL_TAX_RATE: "0.08",
    VAL_CURRENCY: "$"
  },
  categories: [
    { Category_ID: "CAT001", Category_Name: "Pizza", Display_Order: 1, Active_Status: "Y" },
    { Category_ID: "CAT002", Category_Name: "Calzones", Display_Order: 2, Active_Status: "Y" },
    { Category_ID: "CAT003", Category_Name: "Subs", Display_Order: 3, Active_Status: "Y" }
  ],
  subcategories: [
    { Subcategory_ID: "SUB001", Category_ID: "CAT001", Subcategory_Name: "Specialty Pizza", Display_Order: 1 },
    { Subcategory_ID: "SUB002", Category_ID: "CAT001", Subcategory_Name: "Create Your Own", Display_Order: 2 },
    { Subcategory_ID: "SUB003", Category_ID: "CAT003", Subcategory_Name: "Hot Subs", Display_Order: 1 }
  ],
  items: [
    { Item_ID: "ITEM001", Item_Name: "Hawaiian Pizza", Subcategory_ID: "SUB001", Description: "Loaded with sweet pineapples, smoked ham, and premium mozzarella cheese", Has_Modifiers: "Y" },
    { Item_ID: "ITEM002", Item_Name: "BBQ Chicken Pizza", Subcategory_ID: "SUB001", Description: "BBQ sauce base topped with grilled chicken breasts, red onions, and fresh cilantro", Has_Modifiers: "Y" },
    { Item_ID: "ITEM003", Item_Name: "Classic Cheese Pizza", Subcategory_ID: "SUB002", Description: "Traditional red sauce pizza topped with fine mozzarella and Italian oregano", Has_Modifiers: "Y" },
    { Item_ID: "ITEM004", Item_Name: "Meat Lovers Calzone", Subcategory_ID: "SUB001", Description: "Stuffed with pepperoni, smoked ham, meatballs, and rich ricotta", Has_Modifiers: "Y" },
    { Item_ID: "ITEM005", Item_Name: "Italian Sub", Subcategory_ID: "SUB003", Description: "Ham, genoa salami, provolone cheese, lettuce, tomatoes, and balsamic glaze", Has_Modifiers: "Y" }
  ],
  sizes: [
    { SKU_ID: "ITEM001_SM", Item_ID: "ITEM001", Size_Name: "Small", Base_Price: 14.99, Display_Order: 1 },
    { SKU_ID: "ITEM001_LG", Item_ID: "ITEM001", Size_Name: "Large", Base_Price: 20.99, Display_Order: 2 },
    { SKU_ID: "ITEM002_SM", Item_ID: "ITEM002", Size_Name: "Small", Base_Price: 15.99, Display_Order: 1 },
    { SKU_ID: "ITEM002_LG", Item_ID: "ITEM002", Size_Name: "Large", Base_Price: 21.99, Display_Order: 2 },
    { SKU_ID: "ITEM003_SM", Item_ID: "ITEM003", Size_Name: "Small", Base_Price: 11.99, Display_Order: 1 },
    { SKU_ID: "ITEM003_LG", Item_ID: "ITEM003", Size_Name: "Large", Base_Price: 16.99, Display_Order: 2 },
    { SKU_ID: "ITEM004_SM", Item_ID: "ITEM004", Size_Name: "Small", Base_Price: 13.99, Display_Order: 1 },
    { SKU_ID: "ITEM004_LG", Item_ID: "ITEM004", Size_Name: "Large", Base_Price: 18.99, Display_Order: 2 },
    { SKU_ID: "ITEM005_SM", Item_ID: "ITEM005", Size_Name: "Small", Base_Price: 9.99, Display_Order: 1 },
    { SKU_ID: "ITEM005_LG", Item_ID: "ITEM005", Size_Name: "Large", Base_Price: 13.99, Display_Order: 2 }
  ],
  modifierGroups: [
    { Mod_Group_ID: "GRP001", Mod_Group_Name: "Cheese Options", Min_Selections: 0, Max_Selections: 3 },
    { Mod_Group_ID: "GRP002", Mod_Group_Name: "Meat Toppings", Min_Selections: 0, Max_Selections: 10 },
    { Mod_Group_ID: "GRP003", Mod_Group_Name: "Veggie Toppings", Min_Selections: 0, Max_Selections: 10 },
    { Mod_Group_ID: "GRP004", Mod_Group_Name: "Sauces & Crusts", Min_Selections: 1, Max_Selections: 1 }
  ],
  modifiers: [
    { Modifier_ID: "MOD001", Modifier_Name: "Extra Cheese", Default_Group_ID: "GRP001", Tier_Type: "Standard", Price_Small: 1.50, Price_Medium: 1.75, Price_Large: 2.00, Active_Status: "Y" },
    { Modifier_ID: "MOD002", Modifier_Name: "Ham", Default_Group_ID: "GRP002", Tier_Type: "Standard", Price_Small: 1.35, Price_Medium: 1.50, Price_Large: 1.75, Active_Status: "Y" },
    { Modifier_ID: "MOD003", Modifier_Name: "Pepperoni", Default_Group_ID: "GRP002", Tier_Type: "Standard", Price_Small: 1.35, Price_Medium: 1.50, Price_Large: 1.75, Active_Status: "Y" },
    { Modifier_ID: "MOD004", Modifier_Name: "Pineapple", Default_Group_ID: "GRP003", Tier_Type: "Standard", Price_Small: 1.20, Price_Medium: 1.35, Price_Large: 1.50, Active_Status: "Y" },
    { Modifier_ID: "MOD005", Modifier_Name: "Mushrooms", Default_Group_ID: "GRP003", Tier_Type: "Standard", Price_Small: 1.20, Price_Medium: 1.35, Price_Large: 1.50, Active_Status: "Y" },
    { Modifier_ID: "MOD006", Modifier_Name: "Premium Chicken", Default_Group_ID: "GRP002", Tier_Type: "Premium", Price_Small: 2.50, Price_Medium: 3.00, Price_Large: 3.50, Active_Status: "Y" },
    { Modifier_ID: "MOD007", Modifier_Name: "Gluten Free Crust", Default_Group_ID: "GRP004", Tier_Type: "Premium", Price_Small: 3.00, Price_Medium: 4.00, Price_Large: 5.00, Active_Status: "Y" }
  ],
  defaultModifiers: [
    { Default_ID: "ITEM001_MOD002", Item_ID: "ITEM001", Modifier_ID: "MOD002", Included_Portion: "Normal", Exempt_Price: "Y" },
    { Default_ID: "ITEM001_MOD004", Item_ID: "ITEM001", Modifier_ID: "MOD004", Included_Portion: "Normal", Exempt_Price: "Y" },
    { Default_ID: "ITEM002_MOD006", Item_ID: "ITEM002", Modifier_ID: "MOD006", Included_Portion: "Normal", Exempt_Price: "Y" }
  ],
  groupAssignment: [
    { Assign_ID: "ASS001", Apply_Level: "Category", Target_ID: "CAT001", Mod_Group_ID: "GRP001" },
    { Assign_ID: "ASS002", Apply_Level: "Category", Target_ID: "CAT001", Mod_Group_ID: "GRP002" },
    { Assign_ID: "ASS003", Apply_Level: "Category", Target_ID: "CAT001", Mod_Group_ID: "GRP003" },
    { Assign_ID: "ASS004", Apply_Level: "Category", Target_ID: "CAT001", Mod_Group_ID: "GRP004" }
  ],
  selectionRules: [
    { Rule_ID: "SR001", Item_ID: "ITEM003", Mod_Group_ID: "GRP004", Min_Selections: 1, Max_Selections: 1 }
  ],
  orderSessions: [
    {
      Session_ID: "SESS001",
      Item_ID: "ITEM001",
      Size_Name: "Large",
      Cut_Style: "Pie Cut",
      Special_Instructions: "Well done, crisp crust",
      SelectedModifiers: [
        { Modifier_ID: "MOD002", Position: "Whole", Portion_Level: "Normal" }, // Ham - default, Normal -> free!
        { Modifier_ID: "MOD004", Position: "Whole", Portion_Level: "Extra" },  // Pineapple - default, Extra -> pay difference!
        { Modifier_ID: "MOD003", Position: "Left", Portion_Level: "Normal" }   // Pepperoni - custom, Normal -> pay regular!
      ]
    },
    {
      Session_ID: "SESS002",
      Item_ID: "ITEM003",
      Size_Name: "Small",
      Cut_Style: "Square Cut",
      Special_Instructions: "No oregano",
      SelectedModifiers: [
        { Modifier_ID: "MOD001", Position: "Whole", Portion_Level: "Xxtra" }
      ]
    }
  ]
};
