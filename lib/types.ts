export interface SysParams {
  VAL_HALF_FACTOR: string;
  VAL_EXTRA_MULT: string;
  VAL_XXTRA_MULT: string;
  VAL_TAX_RATE: string;
  VAL_CURRENCY: string;
}

export interface Category {
  Category_ID: string;
  Category_Name: string;
  Display_Order: number;
  Active_Status: "Y" | "N";
}

export interface Subcategory {
  Subcategory_ID: string;
  Category_ID: string;
  Subcategory_Name: string;
  Display_Order: number;
}

export interface MenuItem {
  Item_ID: string;
  Item_Name: string;
  Subcategory_ID: string;
  Description: string;
  Has_Modifiers: "Y" | "N";
}

export interface ItemSize {
  SKU_ID: string;
  Item_ID: string;
  Size_Name: "Small" | "Medium" | "Large" | "X-Large";
  Base_Price: number;
  Display_Order: number;
}

export interface ModifierGroup {
  Mod_Group_ID: string;
  Mod_Group_Name: string;
  Min_Selections: number;
  Max_Selections: number;
}

export interface Modifier {
  Modifier_ID: string;
  Modifier_Name: string;
  Default_Group_ID: string;
  Tier_Type: "Standard" | "Premium";
  Price_Small: number;
  Price_Medium: number;
  Price_Large: number;
  Active_Status: "Y" | "N";
}

export interface DefaultModifier {
  Default_ID: string;
  Item_ID: string;
  Modifier_ID: string;
  Included_Portion: "Normal" | "Light" | "Extra" | "Xxtra";
  Exempt_Price: "Y" | "N";
}

export interface GroupAssignment {
  Assign_ID: string;
  Apply_Level: "Category" | "Item";
  Target_ID: string;
  Mod_Group_ID: string;
}

export interface SelectionRule {
  Rule_ID: string;
  Item_ID: string; // empty means "All applicable items"
  Mod_Group_ID: string;
  Min_Selections: number;
  Max_Selections: number;
}

// Derived/Calculated Modifier pricing rules
export interface ModifierPricingRule {
  Rule_ID: string;
  Modifier_ID: string;
  Modifier_Name: string;
  Size_Name: string;
  Position: string;
  Portion_Level: string;
  Base_Size_Price: number;
  Final_Price: number;
}

// Simulator states
export interface SimulatorModifier {
  Modifier_ID: string;
  Position: "Whole" | "Left" | "Right";
  Portion_Level: "Normal" | "Light" | "Extra" | "Xxtra";
}

export interface OrderSession {
  Session_ID: string;
  Item_ID: string;
  Size_Name: "Small" | "Medium" | "Large" | "X-Large";
  Cut_Style: string;
  Special_Instructions: string;
  SelectedModifiers: SimulatorModifier[];
}

export interface WorkbookState {
  sysParams: SysParams;
  categories: Category[];
  subcategories: Subcategory[];
  items: MenuItem[];
  sizes: ItemSize[];
  modifierGroups: ModifierGroup[];
  modifiers: Modifier[];
  defaultModifiers: DefaultModifier[];
  groupAssignment: GroupAssignment[];
  selectionRules: SelectionRule[];
  orderSessions: OrderSession[];
}
