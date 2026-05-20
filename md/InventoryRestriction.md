← Go back to 
[Inventories Module Documentation](/Inventories)


# InventoryRestriction.aspx

## Overview

**File**: `\Inventories\Process\InventoryRestriction.aspx`
**Purpose**: Inventory restriction and accounting entry system for inventory movements
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, accounting personnel, financial managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Registration Date Selection (Required for Filtering)**
- **Registration Date Field**: Must select valid registration date for filtering
- **Error Prevention**: System validates registration date is selected before loading data
- **Data Source**: User input with date validation
- **Default Behavior**: User must select registration date manually
- **Error Message**: Validation prevents data loading without registration date selection
- **Validation**: Date must be valid and within acceptable range

#### 2. **Inventory Movement Selection (Required for Filtering)**
- **Inventory Movement Dropdown**: Must select valid inventory movement for filtering
- **Error Prevention**: System validates inventory movement is selected before loading data
- **Data Source**: Inventories_Porcedures table with movement information
- **Default Behavior**: User must select inventory movement manually
- **Error Message**: Validation prevents data loading without inventory movement selection
- **Validation**: Only active movements are available

#### 3. **Store Selection (Optional for Filtering)**
- **From Store Dropdown**: Optional selection for source store filtering
- **To Store Dropdown**: Optional selection for destination store filtering
- **Error Prevention**: System allows filtering by store if selected
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User can select store or leave empty for all stores
- **Error Message**: No validation required as this is optional
- **Validation**: Only active stores are available

#### 4. **Department Selection (Optional for Filtering)**
- **From Department Dropdown**: Optional selection for source department filtering
- **To Department Dropdown**: Optional selection for destination department filtering
- **Error Prevention**: System allows filtering by department if selected
- **Data Source**: DefinitionDep table with department information
- **Default Behavior**: User can select department or leave empty for all departments
- **Error Message**: No validation required as this is optional
- **Validation**: Only active departments are available

#### 5. **Item Type Selection (Optional for Filtering)**
- **From Item Type Dropdown**: Optional selection for source item type filtering
- **To Item Type Dropdown**: Optional selection for destination item type filtering
- **Error Prevention**: System allows filtering by item type if selected
- **Data Source**: Inventories_item_type table with item type information
- **Default Behavior**: User can select item type or leave empty for all item types
- **Error Message**: No validation required as this is optional
- **Validation**: Only active item types are available

#### 6. **Item Selection (Optional for Filtering)**
- **From Item Dropdown**: Optional selection for source item filtering
- **To Item Dropdown**: Optional selection for destination item filtering
- **Error Prevention**: System allows filtering by item if selected
- **Data Source**: Inventories_Item_Settings table with item information
- **Default Behavior**: User can select item or leave empty for all items
- **Error Message**: No validation required as this is optional
- **Validation**: Only active items are available

#### 7. **Movement Date Selection (Optional for Filtering)**
- **From Movement Date Field**: Optional selection for start date filtering
- **To Movement Date Field**: Optional selection for end date filtering
- **Error Prevention**: System allows filtering by date range if selected
- **Data Source**: User input with date validation
- **Default Behavior**: User can select date range or leave empty for all dates
- **Error Message**: No validation required as this is optional
- **Validation**: Dates must be valid and within acceptable range

#### 8. **Financial Year Selection (Required for Filtering)**
- **Financial Year Dropdown**: Must select valid financial year for filtering
- **Error Prevention**: System validates financial year is selected before loading data
- **Data Source**: Inventories_Stock_Years table with financial year information
- **Default Behavior**: User must select financial year manually
- **Error Message**: Validation prevents data loading without financial year selection
- **Validation**: Only active financial years are available

#### 9. **Entry Type Selection (Required for Entry Creation)**
- **Per Movement Entry Radio Button**: Select to create entry per movement document
- **Aggregated Entry Radio Button**: Select to create aggregated entry per movement type
- **Error Prevention**: System validates entry type is selected before creating entries
- **Data Source**: User selection from radio button options
- **Default Behavior**: User must select entry type manually
- **Error Message**: Validation prevents entry creation without entry type selection
- **Validation**: Only one entry type can be selected

#### 10. **Registration Type Selection (Required for Entry Creation)**
- **Register with Restriction Date Radio Button**: Select to register with restriction date
- **Register with Movement Date Radio Button**: Select to register with movement date
- **Error Prevention**: System validates registration type is selected before creating entries
- **Data Source**: User selection from radio button options
- **Default Behavior**: User must select registration type manually
- **Error Message**: Validation prevents entry creation without registration type selection
- **Validation**: Only one registration type can be selected

### Common Error Scenarios and Prevention

#### **Registration Date Errors**
- **Error**: No registration date selected
- **Prevention**: Always select registration date before loading data
- **Error**: Invalid registration date
- **Prevention**: Verify registration date is valid and within range

#### **Inventory Movement Errors**
- **Error**: No inventory movement selected
- **Prevention**: Always select inventory movement before loading data
- **Error**: Invalid inventory movement
- **Prevention**: Verify inventory movement is active and available

#### **Financial Year Errors**
- **Error**: No financial year selected
- **Prevention**: Always select financial year before loading data
- **Error**: Invalid financial year
- **Prevention**: Verify financial year is active and available

#### **Entry Type Errors**
- **Error**: No entry type selected
- **Prevention**: Always select entry type before creating entries
- **Error**: Invalid entry type
- **Prevention**: Verify entry type is selected

#### **Registration Type Errors**
- **Error**: No registration type selected
- **Prevention**: Always select registration type before creating entries
- **Error**: Invalid registration type
- **Prevention**: Verify registration type is selected

#### **Data Loading Errors**
- **Error**: No data found
- **Prevention**: Ensure filters are properly set before loading data
- **Error**: Entry creation fails
- **Prevention**: Ensure all required fields are filled

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inventory restriction permissions** via employee group assignments
3. **Registration date must be configured** in the system
4. **Inventory movements must be configured** in the system
5. **Financial years must be configured** in the system
6. **Stores must be configured** in the system
7. **Departments must be configured** in the system
8. **Item types must be configured** in the system
9. **Items must be configured** in the system

#### **Required System State**
- User authentication must be active
- Inventory restriction permissions must be configured
- Registration date data must be current
- Inventory movement data must be current
- Financial year data must be current
- Store data must be current
- Department data must be current
- Item type data must be current
- Item data must be current

### Success Criteria

#### **For Registration Date Selection**
- ✅ Registration date field accepts valid date input
- ✅ Registration date validation ensures proper data loading
- ✅ Registration date selection enables data filtering

#### **For Inventory Movement Selection**
- ✅ Inventory movement dropdown populated with active movements only
- ✅ Inventory movement validation ensures proper data loading
- ✅ Inventory movement selection enables data filtering

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper data filtering
- ✅ Store selection enables data filtering

#### **For Department Selection**
- ✅ Department dropdown populated with active departments only
- ✅ Department validation ensures proper data filtering
- ✅ Department selection enables data filtering

#### **For Item Type Selection**
- ✅ Item type dropdown populated with active item types only
- ✅ Item type validation ensures proper data filtering
- ✅ Item type selection enables data filtering

#### **For Item Selection**
- ✅ Item dropdown populated with active items only
- ✅ Item validation ensures proper data filtering
- ✅ Item selection enables data filtering

#### **For Movement Date Selection**
- ✅ Movement date fields accept valid date input
- ✅ Movement date validation ensures proper data filtering
- ✅ Movement date selection enables data filtering

#### **For Financial Year Selection**
- ✅ Financial year dropdown populated with active financial years only
- ✅ Financial year validation ensures proper data loading
- ✅ Financial year selection enables data filtering

#### **For Entry Type Selection**
- ✅ Entry type radio buttons display properly
- ✅ Entry type validation ensures proper entry creation
- ✅ Entry type selection enables entry creation

#### **For Registration Type Selection**
- ✅ Registration type radio buttons display properly
- ✅ Registration type validation ensures proper entry creation
- ✅ Registration type selection enables entry creation

#### **For Data Display**
- ✅ Data grid displays all movements for selected filters
- ✅ Movement details show complete information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Entry Creation**
- ✅ Entry creation creates proper accounting entries
- ✅ Entry type selection controls entry creation
- ✅ Registration type selection controls entry date
- ✅ Entry creation provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for inventory restriction

### Registration Date and Movement Selection Section

```html
<!-- Registration Date and Movement Selection -->
<dx:BootstrapLayoutItem Caption="تاريخ تسجيل القيد" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapDateEdit runat="server" ID="txtdateregister" AutoPostBack="true" OnDateChanged="txtdateregister_DateChanged"></dx:BootstrapDateEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الحركة المخزنية" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbmovefrom" DataSourceID="movefromds" DropDownStyle="DropDown" TextField="Arabic_Name" ValueField="ID" EnableCallbackMode="false" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="Arabic_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Store Selection Section

```html
<!-- Store Selection -->
<dx:BootstrapLayoutItem Caption="من مخزن" ColSpanMd="6" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbstorefrom" DataSourceID="storefromds" DropDownStyle="DropDown" TextField="arabic_name" ValueField="id" EnableMultiColumn="true" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الى مخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbstoreto" DataSourceID="storetods" DropDownStyle="DropDown" TextField="arabic_name" ValueField="id" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Department Selection Section

```html
<!-- Department Selection -->
<dx:BootstrapLayoutItem Caption="من ادارة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="cbdepartfrom" DataSourceID="departfromds" AutoPostBack="true" DropDownStyle="DropDown" TextField="Dep_Name" ValueField="DepID" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="DepID" />
                    <dx:BootstrapListBoxField FieldName="Dep_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الى ادارة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="cbdepartto" DataSourceID="departtods" AutoPostBack="true" DropDownStyle="DropDown" TextField="Dep_Name" ValueField="DepID" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="DepID" />
                    <dx:BootstrapListBoxField FieldName="Dep_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Type Selection Section

```html
<!-- Item Type Selection -->
<dx:BootstrapLayoutItem Caption="من نوع صنف" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbitemkindfrom" DataSourceID="itemkindfromds" DropDownStyle="DropDown" TextField="arabic_name" ValueField="id" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الى نوع صنف" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="cbitemkindto" AutoPostBack="true" DataSourceID="itemkindtods" DropDownStyle="DropDown" TextField="arabic_name" ValueField="id" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Selection Section

```html
<!-- Item Selection -->
<dx:BootstrapLayoutItem Caption="من صنف" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbitemfrom" DataSourceID="itemfromds" DropDownStyle="DropDown" TextField="arabic_name" ValueField="item_code" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="item_code" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الى صنف" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbitemto" DataSourceID="itemtods" DropDownStyle="DropDown" TextField="arabic_name" ValueField="item_code" EnableMultiColumn="true" CallbackPageSize="15" ClearButton-DisplayMode="Always">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="item_code" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Movement Date Selection Section

```html
<!-- Movement Date Selection -->
<dx:BootstrapLayoutItem Caption="من تاريخ حركة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapDateEdit runat="server" ID="txtdatemovefrom"></dx:BootstrapDateEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الى تاريخ حركة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapDateEdit runat="server" ID="txtdatemoveto"></dx:BootstrapDateEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Financial Year Selection Section

```html
<!-- Financial Year Selection -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="dcyear" runat="server" Caption="السنة المالية" TextFormatString="{0}" EnableMultiColumn="true" CallbackPageSize="15" CssClasses-Caption="font-weight-bold w-15" CssClasses-Control="d-flex w-100 ml-4" EnableCallbackMode="false" DataSourceID="adoyear" ValueField="Stock_Table_Name" TextField="Stock_Year">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="Stock_Year" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Search Button Section

```html
<!-- Search Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btnSearch" runat="server" Text="بحث" Width="15%" OnClick="btnSearch_Click">
                <SettingsBootstrap RenderOption="Info" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Data Grid Section

```html
<!-- Data Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="grdDetails" AutoPostBack="true" EnableCallBacks="false" KeyFieldName="NUM" Width="100%" AutoGenerateColumns="False" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomButtonCallback="grdDetails_CustomButtonCallback" OnSelectionChanged="grdDetails_SelectionChanged" OnHtmlRowPrepared="grdDetails_HtmlRowPrepared">
                <SettingsBehavior AllowSelectByRowClick="false" />
                <Settings VerticalScrollBarMode="Auto" VerticalScrollableHeight="300" ShowGroupPanel="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" SelectAllCheckboxMode="Page" />
                    <dx:BootstrapGridViewDataColumn FieldName="NUM" Caption="مسلسل" />
                    <dx:BootstrapGridViewDataColumn FieldName="StockDate" Caption="تاريخ الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="MoveType" Caption="كود الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="Arabic_Name" Caption="اسم الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="storeid" Caption="كود المخزن" />
                    <dx:BootstrapGridViewDataColumn FieldName="doc_id" Caption="رقم مستند الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="totalPrice" Caption="قيمة الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="restriction_Number" Caption="رقم القيد للحركة" />
                    <dx:BootstrapGridViewCommandColumn Caption="عرض مستند الحركة">
                        <CustomButtons>
                            <dx:BootstrapGridViewCommandColumnCustomButton ID="Show" Text="عرض المستند" CssClass="fontColor" />
                        </CustomButtons>
                    </dx:BootstrapGridViewCommandColumn>
                </Columns>
                <SettingsPager Mode="EndlessPaging" AlwaysShowPager="false" Visible="false">
                    <PageSizeItemSettings ShowAllItem="True" />
                </SettingsPager>
                <SettingsDataSecurity AllowEdit="False" AllowInsert="False" AllowDelete="False"></SettingsDataSecurity>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Entry Type Selection Section

```html
<!-- Entry Type Selection -->
<dx:BootstrapLayoutItem Caption="قيد لكل مستند حركة" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapRadioButton ID="rdMove" AutoPostBack="true" runat="server" GroupName="group2">
            </dx:BootstrapRadioButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="قيد مجمع لكل نوع حركة" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapRadioButton ID="rdTotalMovement" AutoPostBack="true" runat="server" GroupName="group2" OnCheckedChanged="rdTotalMovement_CheckedChanged">
            </dx:BootstrapRadioButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Registration Type Selection Section

```html
<!-- Registration Type Selection -->
<dx:BootstrapLayoutItem Caption="التسجيل بتاريخ القيد" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapRadioButton runat="server" AutoPostBack="true" ID="rdLoginRestrictionDate" GroupName="group3">
            </dx:BootstrapRadioButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="التسجيل بتاريخ الحركة" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapRadioButton runat="server" AutoPostBack="true" ID="rdLoginMoveDate" GroupName="group3">
            </dx:BootstrapRadioButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Print and Save Buttons Section

```html
<!-- Print and Save Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" Text="طباعة القيد" AutoPostBack="true" ID="PrintRestriction" OnClick="PrintRestriction_Click">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" Text="طباعة بيان الاجمالى" AutoPostBack="true" ID="PrintTotalMove" OnClick="PrintTotalMove_Click">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" Text="طباعة بيان التفصيلى" AutoPostBack="true" ID="PrintEachMove" OnClick="PrintEachMove_Click">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" Text="حفظ" ID="Create" OnClick="Create_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Selection Summary Section

```html
<!-- Selection Summary -->
<dx:BootstrapLayoutItem Caption="عدد المحدد" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtCount" runat="server" AutoPostBack="true" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="قيمة المحدد" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtSum" runat="server" Enabled="false" AutoPostBack="true"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Report Popup Section

```html
<!-- Report Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="POPUP" SettingsBootstrap-Sizing="Large" Width="1200" ShowCloseButton="true" Modal="true" HeaderText="تقرير" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" AllowResize="true" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <div style="width: 100%; height: 100%" class="container">
                            <iframe id="iframreport" style="width: 100%; height: 100vh;" runat="server" class="pl-2 d-flex flex-grow-1 min-width-zero"></iframe>
                        </div>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@User_ID` - User ID for filtering data

**Registration Date Parameters**:
- `@Registration_Date` - Registration date for filtering

**Movement Parameters**:
- `@Movement_Type` - Movement type for filtering

**Store Parameters**:
- `@Store_From` - Source store for filtering
- `@Store_To` - Destination store for filtering

**Department Parameters**:
- `@Department_From` - Source department for filtering
- `@Department_To` - Destination department for filtering

**Item Type Parameters**:
- `@Item_Type_From` - Source item type for filtering
- `@Item_Type_To` - Destination item type for filtering

**Item Parameters**:
- `@Item_From` - Source item for filtering
- `@Item_To` - Destination item for filtering

**Date Parameters**:
- `@Date_From` - Start date for filtering
- `@Date_To` - End date for filtering

**Financial Year Parameters**:
- `@Financial_Year` - Financial year for filtering

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Registration Date Selection**: Loads data based on registration date
3. **Movement Selection**: Filters data based on movement type
4. **Store Selection**: Filters data based on stores
5. **Department Selection**: Filters data based on departments
6. **Item Type Selection**: Filters data based on item types
7. **Item Selection**: Filters data based on items
8. **Date Selection**: Filters data based on date range
9. **Financial Year Selection**: Filters data based on financial year
10. **Data Display**: Displays filtered data in grid
11. **Entry Creation**: Creates accounting entries based on selection

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads registration date information
3. Loads inventory movement information
4. Loads financial year information
5. Sets default restriction state

### txtdateregister_DateChanged Method

```csharp
protected void txtdateregister_DateChanged(object sender, EventArgs e)
```

**Purpose**: Updates data based on registration date selection

**Process**:
1. Validates registration date selection
2. Updates data filtering
3. Refreshes data grid

### btnSearch_Click Method

```csharp
protected void btnSearch_Click(object sender, EventArgs e)
```

**Purpose**: Searches for data based on selected filters

**Process**:
1. Validates all filter selections
2. Executes search query
3. Displays results in grid
4. Updates selection summary

### Create_Click Method

```csharp
protected void Create_Click(object sender, EventArgs e)
```

**Purpose**: Creates accounting entries based on selection

**Process**:
1. Validates entry type selection
2. Validates registration type selection
3. Validates data selection
4. Creates accounting entries
5. Provides success feedback

### PrintRestriction_Click Method

```csharp
protected void PrintRestriction_Click(object sender, EventArgs e)
```

**Purpose**: Prints restriction report

**Process**:
1. Validates data selection
2. Generates restriction report
3. Displays report in popup

### PrintTotalMove_Click Method

```csharp
protected void PrintTotalMove_Click(object sender, EventArgs e)
```

**Purpose**: Prints total movement report

**Process**:
1. Validates data selection
2. Generates total movement report
3. Displays report in popup

### PrintEachMove_Click Method

```csharp
protected void PrintEachMove_Click(object sender, EventArgs e)
```

**Purpose**: Prints detailed movement report

**Process**:
1. Validates data selection
2. Generates detailed movement report
3. Displays report in popup

## Database Integration

### Core Database Tables

#### **Inventories_Porcedures**
- **Purpose**: Inventory movement procedures
- **Key Fields**: ID, Arabic_Name, Active
- **Usage**: Provides movement list for filtering
- **Filtering**: Only active movements

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Inventory_Type
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, arabic_name, item_code, item_level, active
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types with item_level=1

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Item_Type_id, active
- **Usage**: Provides item list for filtering
- **Filtering**: Only active items

#### **Inventories_Stock_Years**
- **Purpose**: Financial year master data
- **Key Fields**: Stock_Year, Stock_Table_Name, active
- **Usage**: Provides financial year list for filtering
- **Filtering**: Only active financial years

#### **Inventories_Stock**
- **Purpose**: Stock records with movements
- **Key Fields**: NUM, StockDate, MoveType, storeid, doc_id, totalPrice, restriction_Number
- **Usage**: Tracks inventory movements
- **Filtering**: Based on selected filters

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing restriction data

#### **Movement Filtering**
```sql
select ID, Arabic_Name from Inventories_Porcedures where Active=1 and ID<>6
```

**Filtering Logic**: Shows all active movements except movement 6
**Permission Logic**: All active movements are available
**Validation**: Ensures movement is active

#### **Store Filtering**
```sql
select distinct w.id, w.arabic_name, w.Inventory_Type from frontoffice.dbo.Inventories_wharehouse_store w
inner join Inventories_rules_stores rs on rs.store_id=w.id where w.active=1 ORDER BY id ASC
```

**Filtering Logic**: Shows all active stores with rules
**Permission Logic**: All active stores are available
**Validation**: Ensures store is active

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to all dropdowns and date fields

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectByRowClick="false"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Checkbox selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to data grid

### Popup Control Handling

```html
ClientInstanceName="popup"
```

**Popup Features**: Modal popups for report display
**User Experience**: Provides clear report display
**Usage**: Applied to report popups

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Registration Date and Movement Selection Section**
```html
<!-- Registration Date and Movement Selection -->
<dx:BootstrapLayoutItem Caption="تاريخ تسجيل القيد" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="الحركة المخزنية" ColSpanMd="6">
```

#### **2. Store Selection Section**
```html
<!-- Store Selection -->
<dx:BootstrapLayoutItem Caption="من مخزن" ColSpanMd="6" BeginRow="true">
<dx:BootstrapLayoutItem Caption="الى مخزن" ColSpanMd="6">
```

#### **3. Department Selection Section**
```html
<!-- Department Selection -->
<dx:BootstrapLayoutItem Caption="من ادارة" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="الى ادارة" ColSpanMd="6">
```

#### **4. Item Type Selection Section**
```html
<!-- Item Type Selection -->
<dx:BootstrapLayoutItem Caption="من نوع صنف" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="الى نوع صنف" ColSpanMd="6">
```

#### **5. Item Selection Section**
```html
<!-- Item Selection -->
<dx:BootstrapLayoutItem Caption="من صنف" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="الى صنف" ColSpanMd="6">
```

#### **6. Movement Date Selection Section**
```html
<!-- Movement Date Selection -->
<dx:BootstrapLayoutItem Caption="من تاريخ حركة" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="الى تاريخ حركة" ColSpanMd="6">
```

#### **7. Financial Year Selection Section**
```html
<!-- Financial Year Selection -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
```

#### **8. Search Button Section**
```html
<!-- Search Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **9. Data Grid Section**
```html
<!-- Data Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **10. Entry Type Selection Section**
```html
<!-- Entry Type Selection -->
<dx:BootstrapLayoutItem Caption="قيد لكل مستند حركة" ColSpanMd="2" BeginRow="true">
<dx:BootstrapLayoutItem Caption="قيد مجمع لكل نوع حركة" ColSpanMd="2">
```

#### **11. Registration Type Selection Section**
```html
<!-- Registration Type Selection -->
<dx:BootstrapLayoutItem Caption="التسجيل بتاريخ القيد" ColSpanMd="2" BeginRow="true">
<dx:BootstrapLayoutItem Caption="التسجيل بتاريخ الحركة" ColSpanMd="2">
```

#### **12. Print and Save Buttons Section**
```html
<!-- Print and Save Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **13. Selection Summary Section**
```html
<!-- Selection Summary -->
<dx:BootstrapLayoutItem Caption="عدد المحدد" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="قيمة المحدد" ColSpanMd="6">
```

#### **14. Report Popup Section**
```html
<!-- Report Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Movement Data Source
SqlDataSource movefromds = new SqlDataSource();
movefromds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
movefromds.SelectCommand = "select ID, Arabic_Name from Inventories_Porcedures where Active=1 and ID<>6";

// Store Data Source
SqlDataSource storefromds = new SqlDataSource();
storefromds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
storefromds.SelectCommand = "select distinct w.id, w.arabic_name, w.Inventory_Type from frontoffice.dbo.Inventories_wharehouse_store w inner join Inventories_rules_stores rs on rs.store_id=w.id where w.active=1 ORDER BY id ASC";

// Department Data Source
SqlDataSource departfromds = new SqlDataSource();
departfromds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
departfromds.SelectCommand = "select DepID, Dep_Name from orman.dbo.DefinitionDep ORDER BY DepID ASC";

// Item Type Data Source
SqlDataSource itemkindfromds = new SqlDataSource();
itemkindfromds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
itemkindfromds.SelectCommand = "select distinct a.id, a.arabic_name, a.item_code FROM Inventories_item_type a where a.item_level=1 and a.active=1";

// Item Data Source
SqlDataSource itemfromds = new SqlDataSource();
itemfromds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
itemfromds.SelectCommand = "select item_code, arabic_name from Inventories_Item_Settings where Item_Type_id=@typeid and active=1";

// Financial Year Data Source
SqlDataSource adoyear = new SqlDataSource();
adoyear.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
adoyear.SelectCommand = "select Inventories_Stock_Years.Stock_Year, Stock_Table_Name from Inventories_Stock_Years where active=1";
```

## Business Logic and Validation

### Registration Date Validation

```csharp
protected void txtdateregister_DateChanged(object sender, EventArgs e)
{
    if (txtdateregister.Value == "" || txtdateregister.Value == null)
    {
        // Clear data grid
        grdDetails.DataSource = null;
        grdDetails.DataBind();
        return;
    }
    // ... additional validation
}
```

**Registration Date Logic**: Validates registration date selection before loading data
**Error Prevention**: Prevents data loading without registration date selection

### Movement Validation

```csharp
protected void btnSearch_Click(object sender, EventArgs e)
{
    if (cbmovefrom.Value == "" || cbmovefrom.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الحركة المخزنية');", true);
        return;
    }
    // ... additional validation
}
```

**Movement Logic**: Validates movement selection before loading data
**Error Prevention**: Prevents data loading without movement selection

### Entry Type Validation

```csharp
protected void Create_Click(object sender, EventArgs e)
{
    if (!rdMove.Checked && !rdTotalMovement.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع القيد');", true);
        return;
    }
    // ... additional validation
}
```

**Entry Type Logic**: Validates entry type selection before creating entries
**Error Prevention**: Prevents entry creation without entry type selection

### Registration Type Validation

```csharp
protected void Create_Click(object sender, EventArgs e)
{
    if (!rdLoginRestrictionDate.Checked && !rdLoginMoveDate.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع التسجيل');", true);
        return;
    }
    // ... additional validation
}
```

**Registration Type Logic**: Validates registration type selection before creating entries
**Error Prevention**: Prevents entry creation without registration type selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Registration Date Validation**: Must select registration date before loading data
- **Movement Validation**: Must select movement before loading data
- **Financial Year Validation**: Must select financial year before loading data
- **Entry Type Validation**: Must select entry type before creating entries
- **Registration Type Validation**: Must select registration type before creating entries

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Registration Date Validation**: Ensures registration date is valid and within range
- **Movement Validation**: Ensures movement is active and available
- **Financial Year Validation**: Ensures financial year is active and available
- **Entry Type Validation**: Ensures entry type is selected
- **Registration Type Validation**: Ensures registration type is selected

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Data Access**: Ensures user has access to selected data
- **Entry Access**: Ensures user can create and modify entries

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: "تم البحث بنجاح" (Search completed successfully)
- **Entry Creation Success**: "تم إنشاء القيد بنجاح" (Entry created successfully)
- **Print Success**: "تم الطباعة بنجاح" (Print completed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of data grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Inventory Restriction Management System**
- **Database Tables**:
  - `Inventories_Porcedures` - Movement procedures
  - `Inventories_wharehouse_store` - Store master data
  - `DefinitionDep` - Department master data
  - `Inventories_item_type` - Item type master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock_Years` - Financial year master data
  - `Inventories_Stock` - Stock records with movements
- **Integration Details**:
  - Registration date controls data filtering
  - Movement selection controls data filtering
  - Store selection controls data filtering
  - Department selection controls data filtering
  - Item type selection controls data filtering
  - Item selection controls data filtering
  - Date selection controls data filtering
  - Financial year selection controls data filtering
  - Entry type selection controls entry creation
  - Registration type selection controls entry date
- **Data Flow**:
  - Data filtered based on all selections
  - Entries created based on entry type
  - Entry date based on registration type

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all restriction operations
  - Data access controlled by user permissions

### Data Exchange

#### **Movement and Store Information**
- **Database Tables**:
  - `Inventories_Porcedures` - Movement procedures
  - `Inventories_wharehouse_store` - Store master data
- **Real-time Data**:
  - Movement information for filtering
  - Store information for filtering
  - Data quantities and values
- **Data Relationships**:
  - Movements linked to data via MoveType
  - Stores linked to data via storeid
  - Entries created based on data

#### **Department and Item Information**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Inventories_item_type` - Item type master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Department information for filtering
  - Item type information for filtering
  - Item information for filtering
- **Data Relationships**:
  - Departments linked to data via department code
  - Item types linked to items via Item_Type_id
  - Items linked to data via item code

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار تاريخ تسجيل القيد" Error**
- **Cause**: Registration date not selected before loading data
- **Solution**: Always select registration date before loading data
- **Prevention**: Registration date selection is required for all operations

#### **"الرجاء اختيار الحركة المخزنية" Error**
- **Cause**: Movement not selected before loading data
- **Solution**: Always select movement before loading data
- **Prevention**: Movement selection is required for all operations

#### **"الرجاء اختيار السنة المالية" Error**
- **Cause**: Financial year not selected before loading data
- **Solution**: Always select financial year before loading data
- **Prevention**: Financial year selection is required for all operations

#### **"الرجاء اختيار نوع القيد" Error**
- **Cause**: Entry type not selected before creating entries
- **Solution**: Always select entry type before creating entries
- **Prevention**: Entry type selection is required for all entry operations

#### **"الرجاء اختيار نوع التسجيل" Error**
- **Cause**: Registration type not selected before creating entries
- **Solution**: Always select registration type before creating entries
- **Prevention**: Registration type selection is required for all entry operations

#### **No Data Found**
- **Cause**: Filters are too restrictive
- **Solution**: Adjust filters to find data
- **Prevention**: Ensure filters are properly set

#### **Entry Creation Failed Error**
- **Cause**: Entry cannot be created
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before creation

#### **Print Failed Error**
- **Cause**: Report cannot be generated
- **Solution**: Verify data is selected before printing
- **Prevention**: Ensure proper selection before printing

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Restriction Access**: Access to restriction operations
- **Data Access**: Access to data with restriction information

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Restriction Workflow**: Understanding of restriction process
- **Data Management**: Knowledge of data selection and filtering
- **Entry Management**: Knowledge of entry creation and printing
- **Report Management**: Familiarity with report generation and display

## Usage Examples

### Basic Restriction Workflow

1. **Page Load**: Verify page loads with default data
2. **Registration Date Selection**: Select registration date for filtering
3. **Movement Selection**: Select movement for filtering
4. **Financial Year Selection**: Select financial year for filtering
5. **Data Search**: Search for data based on filters
6. **Data Review**: Review data in grid
7. **Entry Type Selection**: Select entry type for entry creation
8. **Registration Type Selection**: Select registration type for entry date
9. **Entry Creation**: Create accounting entries
10. **Report Printing**: Print restriction reports

### Data Filtering Workflow

1. **Registration Date Selection**: Select registration date for filtering
2. **Movement Selection**: Select movement for filtering
3. **Store Selection**: Select stores for filtering (optional)
4. **Department Selection**: Select departments for filtering (optional)
5. **Item Type Selection**: Select item types for filtering (optional)
6. **Item Selection**: Select items for filtering (optional)
7. **Date Selection**: Select date range for filtering (optional)
8. **Financial Year Selection**: Select financial year for filtering
9. **Data Search**: Search for data based on all filters
10. **Data Review**: Review filtered data in grid

### Entry Creation Workflow

1. **Data Search**: Search for data based on filters
2. **Data Selection**: Select data for entry creation
3. **Entry Type Selection**: Select entry type (per movement or aggregated)
4. **Registration Type Selection**: Select registration type (restriction date or movement date)
5. **Entry Creation**: Create accounting entries
6. **Report Printing**: Print restriction reports
7. **Entry Verification**: Verify entries are created correctly