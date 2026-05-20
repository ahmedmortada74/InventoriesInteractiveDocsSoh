← Go back to 
[Inventories Module Documentation](/Inventories)


# AskSpeculation.aspx

## Overview

**File**: `\Inventories\Process\AskSpeculation.aspx`
**Purpose**: Speculation/valuation request system for inventory items with committee-based workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, committee members, valuation personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with active rules are available

#### 2. **Item Type Selection (Required for Items)**
- **Item Type Dropdown**: Must select valid item type for item filtering
- **Error Prevention**: System validates item type is selected before loading items
- **Data Source**: Inventories_item_type table linked with store type
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents item loading without item type selection
- **Validation**: Only active item types are available

#### 3. **Committee Selection (Required for Request)**
- **Committee Dropdown**: Must select valid committee for speculation request
- **Error Prevention**: System validates committee is selected before creating request
- **Data Source**: Inventories_check_header table with committee information
- **Default Behavior**: User must select committee manually
- **Error Message**: Validation prevents request creation without committee selection
- **Validation**: Only active committees are available

#### 4. **Item Selection (Required for Request)**
- **Item Dropdown**: Must select valid item from available inventory
- **Error Prevention**: System validates item is selected before adding to request
- **Data Source**: Inventories_Item_Settings table with available items
- **Default Behavior**: User must select item manually from dropdown
- **Error Message**: Validation prevents request creation without item selection
- **Validation**: Only items with available quantities are available

#### 5. **Batch Selection (Required for Request)**
- **Batch Dropdown**: Must select valid batch for item request
- **Error Prevention**: System validates batch is selected before adding to request
- **Data Source**: Inventories_Stock table with batch information
- **Default Behavior**: User must select batch manually
- **Error Message**: Validation prevents request creation without batch selection
- **Validation**: Only batches with available quantities are available

#### 6. **Speculation Amount Input (Required for Request)**
- **Speculation Amount Field**: Must enter valid speculation amount
- **Error Prevention**: System validates speculation amount is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter speculation amount manually
- **Error Message**: Validation prevents request with zero, negative, or excessive speculation amount
- **Validation**: Speculation amount must be positive and not exceed available amount

#### 7. **Speculation Reason Selection (Required for Request)**
- **Speculation Reason Dropdown**: Must select valid speculation reason
- **Error Prevention**: System validates speculation reason is selected before adding to request
- **Data Source**: Inventories_Reasons table with speculation reasons
- **Default Behavior**: User must select speculation reason manually
- **Error Message**: Validation prevents request creation without speculation reason selection
- **Validation**: Only active speculation reasons are available

### Common Error Scenarios and Prevention

#### **Store and Item Type Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: No item type selected
- **Prevention**: Always select item type before loading items
- **Error**: Store has no available items
- **Prevention**: Verify store has items with available quantities

#### **Committee and Item Errors**
- **Error**: No committee selected
- **Prevention**: Always select committee before creating request
- **Error**: No item selected
- **Prevention**: Always select item from dropdown before adding to request
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before adding to request

#### **Batch and Speculation Amount Errors**
- **Error**: No batch selected
- **Prevention**: Always select batch before adding to request
- **Error**: Zero or negative speculation amount
- **Prevention**: Always enter positive speculation amount values
- **Error**: Speculation amount exceeds available
- **Prevention**: System validates speculation amount against available amounts

#### **Speculation Reason Errors**
- **Error**: No speculation reason selected
- **Prevention**: Always select speculation reason before adding to request
- **Error**: Invalid speculation reason
- **Prevention**: Verify speculation reason is active and available

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item delete fails
- **Prevention**: Select valid item from grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have speculation request permissions** via employee group assignments
3. **Stores must have available items** for request
4. **Committees must be configured** in the system
5. **Speculation reasons must be configured** in the system
6. **Request workflow must be enabled** for speculation items

#### **Required System State**
- User authentication must be active
- Speculation request permissions must be configured
- Store data must be current
- Committee data must be current
- Speculation reason data must be current
- Request workflow must be enabled

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Store validation ensures proper item filtering
- ✅ Store selection enables item loading

#### **For Item Type Selection**
- ✅ Item type dropdown populated with available item types only
- ✅ Item type validation ensures proper item filtering
- ✅ Item type selection enables item loading

#### **For Committee Selection**
- ✅ Committee dropdown populated with active committees only
- ✅ Committee validation ensures proper request creation
- ✅ Committee selection enables request workflow

#### **For Item Selection**
- ✅ Item dropdown displays all available items for selected item type
- ✅ Item details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Batch Selection**
- ✅ Batch dropdown displays all available batches for item
- ✅ Batch details show complete inventory information
- ✅ Available quantity validation ensures proper limits
- ✅ Expiration date displays for each batch

#### **For Request Management**
- ✅ Request save creates proper request records
- ✅ Item delete removes items from grid
- ✅ Request workflow works with proper validation
- ✅ Request completion provides success feedback

#### **For Data Management**
- ✅ Request grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for speculation request

### Store and Item Type Selection Section

```html
<!-- Store and Item Type Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbstore" DropDownStyle="DropDownList" TextField="english_name" ValueField="id" DataSourceID="dsInventory" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="cbstore_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbitemkind" DropDownStyle="DropDownList" TextField="english_name" ValueField="id" DataSourceID="dsItemsKind" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="english_name" />
                    <dx:BootstrapListBoxField FieldName="item_code" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Committee Selection Section

```html
<!-- Committee Selection -->
<dx:BootstrapLayoutItem Caption="اللجنة" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="txtCommission" DropDownStyle="DropDownList" TextField="description" ValueField="ID" DataSourceID="dscheck" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item and Batch Selection Section

```html
<!-- Item and Batch Selection -->
<dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbitem" DropDownStyle="DropDownList" TextField="arabic_name" ValueField="item_code" DataSourceID="dsItem" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" OnSelectedIndexChanged="cbitem_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="item_code" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الدفعة" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbbatch" DataSourceID="dsBatches" DropDownStyle="DropDownList" TextField="batch_no" ValueField="ID" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="cbbatch_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="batch_no" />
                    <dx:BootstrapListBoxField FieldName="ID" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Information Section

```html
<!-- Item Information -->
<dx:BootstrapLayoutItem Caption="الكمية المتاحة" ColSpanMd="3" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtamountvaliable" runat="server" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="وحدة الصرف" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtstorge" runat="server" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="سعر الوحدة" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtunitprice" runat="server" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="اجمالى القيمة" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txttotalprice" runat="server" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ الصلاحية" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtdate" runat="server" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Speculation Input Section

```html
<!-- Speculation Input -->
<dx:BootstrapLayoutItem Caption="كمية التكهين" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtspecamount" runat="server"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="سبب التكهين" ColSpanMd="8">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbReasons" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="reason" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Management Section

```html
<!-- Item Management -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="btnsave" Text="اضافة" OnClick="btnsave_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
            <dx:BootstrapButton ID="btnDelete" runat="server" Text="حذف" OnClick="btnDelete_Click">
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdAskPeculation" AutoPostBack="true" runat="server" AutoGenerateColumns="False" KeyFieldName="id" EnableCallBacks="false" DataSourceID="dsshowItems" OnSelectionChanged="grdAskPeculation_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0" />
                    <dx:BootstrapGridViewTextColumn FieldName="id" VisibleIndex="1" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fileID" VisibleIndex="1" Caption="مسلسل"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inventory_Name" VisibleIndex="2" Caption="اسم المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inventory_code" VisibleIndex="3" Caption="كود المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Kind" VisibleIndex="4" Caption="نوع الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Kind_code" VisibleIndex="5" Caption="كود نوع الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Name" VisibleIndex="6" Caption="اسم الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Name_code" VisibleIndex="7" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="check_Name" VisibleIndex="8" Caption="اسم اللجنة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="check_code" VisibleIndex="9" Caption="رقم اللجنة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_No" VisibleIndex="10" Caption="الدفعة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="available_amount" VisibleIndex="11" Caption="الكمية المتاحة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Unit" VisibleIndex="12" Caption="وحدة الصرف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="price_Unit" VisibleIndex="13" Caption="سعر الوحدة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="total_Price" VisibleIndex="14" Caption="اجمالى القيمة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exp_Date" VisibleIndex="15" Caption="تاريخ الصلاحية"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="speculation_Amount" VisibleIndex="16" Caption="كمية التكهين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="speculation_Reason" VisibleIndex="17" Caption="سبب التكهين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="StockId" VisibleIndex="18" Visible="false"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" Items="10, 20, 50" />
                </SettingsPager>
                <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                <SettingsDataSecurity AllowEdit="False" AllowInsert="False" AllowDelete="False"></SettingsDataSecurity>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Save Section

```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="btnAdd" Text="حفظ" OnClick="btnAdd_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Store Parameters**:
- `@id` - Store ID for filtering items
- `@storeid` - Store ID for batch selection

**Item Parameters**:
- `@typeid` - Item type ID for filtering items
- `@itemcode` - Item code for batch selection

**User Context Parameters**:
- `@emp` - Employee code for filtering permissions

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads item types based on selected store
3. **Item Type Selection**: Loads items based on selected item type
4. **Committee Selection**: Loads committee information
5. **Item Selection**: Loads batch information for selected item
6. **Batch Selection**: Loads available batches with quantities
7. **Request Creation**: Adds items to request grid
8. **Request Save**: Creates complete request records

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default request state

### cbstore_SelectedIndexChanged Method

```csharp
protected void cbstore_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item types based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for item type data source
3. Binds item type dropdown
4. Clears item type selection

### cbitem_SelectedIndexChanged Method

```csharp
protected void cbitem_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information for selected item

**Process**:
1. Validates item selection
2. Sets parameters for batch data source
3. Binds batch dropdown
4. Clears batch selection

### cbbatch_SelectedIndexChanged Method

```csharp
protected void cbbatch_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch details for selected batch

**Process**:
1. Validates batch selection
2. Retrieves batch details from database
3. Updates batch information display
4. Clears speculation amount

### btnsave_Click Method

```csharp
protected void btnsave_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to request grid

**Process**:
1. Validates all required fields are filled
2. Validates speculation amount is greater than 0
3. Validates speculation reason is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes request grid
7. Clears form fields for next addition

### btnDelete_Click Method

```csharp
protected void btnDelete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from request grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes request grid
4. Clears form fields

### btnAdd_Click Method

```csharp
protected void btnAdd_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete request

**Process**:
1. Validates at least one item is added
2. Generates new request document number
3. Inserts request header record
4. Inserts all grid items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, english_name, active, Store_type, Inventory_Type
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with active rules

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, english_name, item_code, item_level
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types

#### **Inventories_check_header**
- **Purpose**: Committee header records
- **Key Fields**: ID, description, check_id, status, check_type, active
- **Usage**: Provides committee list for speculation requests
- **Filtering**: Only active committees with check_id=3

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Item_Type_id, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items with available quantities

#### **Inventories_Stock**
- **Purpose**: Stock records with batch tracking
- **Key Fields**: ID, Itemcode, storeid, batch_no, Quantity_storage, Amount_Done, Unit_Exchange_quanity, Amount_Done_Exchange, Expiration_date, MoveType
- **Usage**: Tracks stock availability for speculation
- **Filtering**: Only items with available quantities

#### **Inventories_Speculation_Temp**
- **Purpose**: Temporary speculation records before save
- **Key Fields**: id, fileID, inventory_Name, inventory_code, item_Kind, item_Kind_code, item_Name, item_Name_code, check_Name, check_code, batch_No, available_amount, storage_Unit, price_Unit, total_Price, exp_Date, speculation_Amount, speculation_Reason, StockId
- **Usage**: Tracks speculation items before request save

#### **Inventories_Reasons**
- **Purpose**: Speculation reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides speculation reasons for requests
- **Filtering**: Only active reasons with type=14

#### **Inventories_rules_stores**
- **Purpose**: Store rules master data
- **Key Fields**: store_id, emp_id, active
- **Usage**: Provides store rules for employees

#### **Inventories_rules_items_type**
- **Purpose**: Item type rules master data
- **Key Fields**: Items_Type_id, emp_id, active
- **Usage**: Provides item type rules for employees

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing request operations

#### **Store Filtering**
```sql
select distinct w.id,w.english_name,w.Inventory_Type from frontoffice.dbo.Inventories_wharehouse_store w
inner join Inventories_rules_stores rs on rs.store_id=w.id where w.active =1 and Store_type=1
```

**Filtering Logic**: Shows only stores with active rules
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has request items

## Client-Side JavaScript

### AutoPostBack Handling

```html
<dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbstore" ...>
```

**AutoPostBack**: Enables automatic postback on selection changes
**User Experience**: Provides immediate feedback when selections change
**Server Integration**: Coordinates with server-side event handling

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store and Item Type Selection Section**
```html
<!-- Store and Item Type Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="8">
<dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="8">
```

#### **2. Committee Selection Section**
```html
<!-- Committee Selection -->
<dx:BootstrapLayoutItem Caption="اللجنة" ColSpanMd="8">
```

#### **3. Item and Batch Selection Section**
```html
<!-- Item and Batch Selection -->
<dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="8">
<dx:BootstrapLayoutItem Caption="الدفعة" ColSpanMd="8">
```

#### **4. Item Information Section**
```html
<!-- Item Information -->
<dx:BootstrapLayoutItem Caption="الكمية المتاحة" ColSpanMd="3" BeginRow="true">
<dx:BootstrapLayoutItem Caption="وحدة الصرف" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="سعر الوحدة" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="اجمالى القيمة" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="تاريخ الصلاحية" ColSpanMd="3">
```

#### **5. Speculation Input Section**
```html
<!-- Speculation Input -->
<dx:BootstrapLayoutItem Caption="كمية التكهين" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="سبب التكهين" ColSpanMd="8">
```

#### **6. Item Management Section**
```html
<!-- Item Management -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btnsave" runat="server" OnClick="btnsave_Click">
            <dx:BootstrapButton ID="btnDelete" runat="server" OnClick="btnDelete_Click">
        </dx:ContentControl>
    </ContentCollection>
```

#### **7. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdAskPeculation" runat="server" OnSelectionChanged="grdAskPeculation_SelectionChanged">
```

#### **8. Request Save Section**
```html
<!-- Request Save -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btnAdd" runat="server" OnClick="btnAdd_Click">
        </dx:ContentControl>
    </ContentCollection>
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource dsInventory = new SqlDataSource();
dsInventory.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsInventory.SelectCommand = "select distinct w.id,w.english_name,w.Inventory_Type from frontoffice.dbo.Inventories_wharehouse_store w inner join Inventories_rules_stores rs on rs.store_id=w.id where w.active =1 and Store_type=1";

// Item Type Data Source
SqlDataSource dsItemsKind = new SqlDataSource();
dsItemsKind.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsItemsKind.SelectCommand = "SELECT distinct it.Items_Type_id,c.id, c.english_name,c.item_code FROM Inventories_item_type a inner join Inventories_wharehouse_store b on b.Inventory_Type=a.id and a.item_level=1 inner join Inventories_item_type c on SUBSTRING(c.item_code,1,2)=a.item_code and c.item_level=3 left join Inventories_rules_items_type it on it.Items_Type_id=c.id where b.id=@id and emp_id =@emp";

// Committee Data Source
SqlDataSource dscheck = new SqlDataSource();
dscheck.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dscheck.SelectCommand = "select ID,description from Inventories_check_header where check_id=3 and status=0 and check_type=2 and active=1";

// Item Data Source
SqlDataSource dsItem = new SqlDataSource();
dsItem.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsItem.SelectCommand = "select item_code,arabic_name from Inventories_Item_Settings where Item_Type_id=@typeid";

// Batch Data Source
SqlDataSource dsBatches = new SqlDataSource();
dsBatches.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsBatches.SelectCommand = "select batch_no,(((Quantity_storage-Amount_Done)*Unit_Exchange_quanity)-Amount_Done_Exchange) as available_Amount,ins.ID from Inventories_Stock ins inner join Inventories_Item_Settings its on its.item_code=ins.Itemcode where itemcode=@itemcode and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) and ins.storeid =@storeid and (((Quantity_storage-Amount_Done)*Unit_Exchange_quanity)-Amount_Done_Exchange) >=1 order by ID";

// Speculation Reason Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=14";

// Request Items Data Source
SqlDataSource dsshowItems = new SqlDataSource();
dsshowItems.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsshowItems.SelectCommand = "select id, fileID,inventory_Name,inventory_code,item_Kind,item_Kind_code,item_Name,item_Name_code,check_Name,batch_No,check_code,available_amount,storage_Unit,price_Unit,total_Price,exp_Date,speculation_Amount,speculation_Reason,StockId from Inventories_Speculation_Temp";
```

## Business Logic and Validation

### Store and Item Type Validation

```csharp
protected void cbitem_SelectedIndexChanged(object sender, EventArgs e)
{
    if (cbstore.Value == "" || cbstore.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading items
**Item Type Logic**: Validates item type selection before loading items
**Error Prevention**: Prevents item loading without proper store and item type context

### Committee Validation

```csharp
protected void btnsave_Click(object sender, EventArgs e)
{
    if (txtCommission.Value == "" || txtCommission.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار اللجنة');", true);
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates committee selection before adding to request
**Error Prevention**: Prevents request creation without proper committee selection

### Batch Validation

```csharp
protected void btnsave_Click(object sender, EventArgs e)
{
    if (cbbatch.Value == "" || cbbatch.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الدفعة');", true);
        return;
    }
    // ... additional validation
}
```

**Batch Logic**: Validates batch selection before adding to request
**Error Prevention**: Prevents request creation without proper batch selection

### Speculation Amount Validation

```csharp
protected void btnsave_Click(object sender, EventArgs e)
{
    if (Convert.ToDouble(txtspecamount.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال كمية التكهين');", true);
        return;
    }
    else if (Convert.ToDouble(txtspecamount.Text) > Convert.ToDouble(txtamountvaliable.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('كمية التكهين المدخلة اكبر من الكمية المتاحة');", true);
        return;
    }
    // ... additional validation
}
```

**Speculation Amount Logic**: Validates speculation amount is positive and within limits
**Availability Logic**: Validates speculation amount does not exceed available amount
**Error Prevention**: Prevents request with invalid speculation amount

### Speculation Reason Validation

```csharp
protected void btnsave_Click(object sender, EventArgs e)
{
    if (cbReasons.Value == "" || cbReasons.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب التكهين');", true);
        return;
    }
    // ... additional validation
}
```

**Speculation Reason Logic**: Validates speculation reason selection before adding to request
**Error Prevention**: Prevents request creation without proper speculation reason selection

### Request Save Validation

```csharp
protected void btnAdd_Click(object sender, EventArgs e)
{
    if (grdAskPeculation.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before saving
**Empty Logic**: Prevents saving empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading items
- **Item Type Selection Validation**: Must select item type before loading items
- **Committee Selection Validation**: Must select committee before creating request
- **Item Selection Validation**: Must select item from dropdown before adding to request
- **Batch Selection Validation**: Must select batch before adding to request
- **Speculation Amount Validation**: Must enter positive speculation amount within limits
- **Speculation Reason Validation**: Must select speculation reason before adding to request

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store has active rules
- **Item Type Validation**: Ensures item type is active and available
- **Committee Validation**: Ensures committee is active and available
- **Item Availability Validation**: Ensures items have available quantities
- **Batch Availability Validation**: Ensures batches have available quantities
- **Speculation Amount Validation**: Ensures speculation amounts are within allowed limits
- **Speculation Reason Validation**: Ensures speculation reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify request records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Request Save Success**: "تم حفظ طلب التكهين" (Speculation request saved successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of request grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Speculation Management System**
- **Database Tables**:
  - `Inventories_Speculation_Temp` - Temporary speculation records before save
  - `Inventories_Speculation_HD` - Speculation request header records
  - `Inventories_Speculation_DTL` - Speculation request detail records
- **Integration Details**:
  - Speculation workflow controlled by store and committee selection
  - Speculation amounts tracked against available quantities
  - Temporary records stored before request save
- **Data Flow**:
  - Items filtered by store and available quantities
  - Speculation amounts validated against available limits
  - Temporary records stored for request save

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Permission System**:
  - User authentication required for all request operations
  - Speculation permissions configured via employee group assignments

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch tracking
- **Integration Details**:
  - Item information displayed for request selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Store information for item filtering
  - Item information for request
  - Item quantities and availability
- **Data Relationships**:
  - Stores linked to items via stock records
  - Items linked to types via item type associations
  - Temporary records cleared after request save

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch tracking
- **Real-time Data**:
  - Item details and descriptions
  - Batch information and quantities
  - Expiration dates and availability
- **Data Relationships**:
  - Items linked to batches via stock records
  - Batch information displayed for speculation items
  - Expiration dates tracked for each batch

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all request operations

#### **"الرجاء اختيار نوع الصنف" Error**
- **Cause**: Item type not selected before loading items
- **Solution**: Always select item type before loading items
- **Prevention**: Item type selection is required for all request operations

#### **"الرجاء اختيار اللجنة" Error**
- **Cause**: Committee not selected before adding to request
- **Solution**: Always select committee before adding to request
- **Prevention**: Committee selection is required for all request operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from dropdown before adding to request
- **Solution**: Always select item from dropdown before adding to request
- **Prevention**: Item selection is required for all request operations

#### **"الرجاء اختيار الدفعة" Error**
- **Cause**: Batch not selected before adding to request
- **Solution**: Always select batch before adding to request
- **Prevention**: Batch selection is required for all request operations

#### **"الرجاء ادخال كمية التكهين" Error**
- **Cause**: Speculation amount not entered or zero/negative
- **Solution**: Always enter positive speculation amount
- **Prevention**: Speculation amount must be greater than 0

#### **"كمية التكهين المدخلة اكبر من الكمية المتاحة" Error**
- **Cause**: Speculation amount exceeds available amount
- **Solution**: Enter speculation amount within available limit
- **Prevention**: System validates speculation amount against available amounts

#### **"الرجاء اختيار سبب التكهين" Error**
- **Cause**: Speculation reason not selected before adding to request
- **Solution**: Always select speculation reason before adding to request
- **Prevention**: Speculation reason selection is required for all request operations

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Request must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Request Access**: Access to request operations
- **Store Access**: Access to stores with request items
- **Item Access**: Access to items with available quantities

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Request Workflow**: Understanding of request process
- **Store Management**: Knowledge of store selection and item filtering
- **Item Management**: Familiarity with item selection and quantity management
- **Request Management**: Understanding of request save and delete operations

## Usage Examples

### Basic Request Workflow

1. **Page Load**: Verify user is logged in with proper permissions
2. **Store Selection**: Select store for request
3. **Item Type Selection**: Select item type for request
4. **Committee Selection**: Select committee for speculation request
5. **Item Selection**: Select item from available items dropdown
6. **Batch Selection**: Select batch for item
7. **Speculation Amount Entry**: Enter speculation amount within limits
8. **Speculation Reason Selection**: Select speculation reason
9. **Item Addition**: Click add button to add item to request grid
10. **Repeat Items**: Add additional request items as needed
11. **Request Save**: Click save button to create complete request

### Request Item Management Workflow

1. **Store Selection**: Select store for request
2. **Item Type Selection**: Select item type for request
3. **Committee Selection**: Select committee for speculation request
4. **Item Selection**: Select item from available items dropdown
5. **Batch Selection**: Select batch for item
6. **Speculation Amount Entry**: Enter speculation amount within limits
7. **Speculation Reason Selection**: Select speculation reason
8. **Item Addition**: Add item to request grid
9. **Item Review**: Review items in request grid
10. **Item Delete**: Remove items from request grid
11. **Request Completion**: Save request with all validated items

### Multi-Item Request Management

1. **Store Selection**: Select store for request
2. **Item Type Selection**: Select item type for request
3. **Committee Selection**: Select committee for speculation request
4. **Item Review**: Review all available items for selected item type
5. **Selective Request**: Add specific items as needed
6. **Speculation Amount Management**: Manage speculation amounts for each item
7. **Speculation Reason Management**: Manage speculation reasons for each item
8. **Request Validation**: Ensure all items have proper validation
9. **Request Save**: Save request with all validated items