← Go back to 
[Inventories Module Documentation](/Inventories)


# SaleOrder.aspx

## Overview

**File**: `\Inventories\Process\SaleOrder.aspx`
**Purpose**: Sale order system for creating and managing inventory item sales
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Sales personnel, inventory administrators, order managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Item Selection (Required for Order Creation)**
- **Item Dropdown**: Must select valid item for order creation
- **Error Prevention**: System validates item is selected before loading batches
- **Data Source**: Inventories_Item_Settings table with item information
- **Default Behavior**: User must select item manually
- **Error Message**: Validation prevents batch loading without item selection
- **Validation**: Only active items are available

#### 2. **Batch Selection (Required for Order Creation)**
- **Batch Dropdown**: Must select valid batch for order creation
- **Error Prevention**: System validates batch is selected before loading details
- **Data Source**: Inventories_Stock table with batch information
- **Default Behavior**: User must select batch manually
- **Error Message**: Validation prevents details loading without batch selection
- **Validation**: Only batches with available quantity are available

#### 3. **Unit Price Input (Required for Order Creation)**
- **Unit Price Field**: Must enter valid unit price for order creation
- **Error Prevention**: System validates unit price is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter unit price manually
- **Error Message**: Validation prevents order with zero or negative unit price
- **Validation**: Unit price must be positive number

#### 4. **Sell Quantity Input (Required for Order Creation)**
- **Sell Quantity Field**: Must enter valid sell quantity for order creation
- **Error Prevention**: System validates sell quantity is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter sell quantity manually
- **Error Message**: Validation prevents order with zero or negative sell quantity
- **Validation**: Sell quantity must be positive number

#### 5. **Buyer Selection (Required for Order Creation)**
- **Buyer Dropdown**: Must select valid buyer for order creation
- **Error Prevention**: System validates buyer is selected before order creation
- **Data Source**: purches_Supplier_record table with buyer information
- **Default Behavior**: User must select buyer manually
- **Error Message**: Validation prevents order without buyer selection
- **Validation**: Only active buyers are available

### Common Error Scenarios and Prevention

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before loading batches
- **Error**: Item has no batches
- **Prevention**: Verify item has batches before selection

#### **Batch Selection Errors**
- **Error**: No batch selected
- **Prevention**: Always select batch before loading details
- **Error**: Batch has no available quantity
- **Prevention**: Verify batch has available quantity before selection

#### **Unit Price Errors**
- **Error**: No unit price entered
- **Prevention**: Always enter unit price before order creation
- **Error**: Zero or negative unit price
- **Prevention**: Always enter positive unit price values

#### **Sell Quantity Errors**
- **Error**: No sell quantity entered
- **Prevention**: Always enter sell quantity before order creation
- **Error**: Zero or negative sell quantity
- **Prevention**: Always enter positive sell quantity values

#### **Buyer Selection Errors**
- **Error**: No buyer selected
- **Prevention**: Always select buyer before order creation
- **Error**: Buyer not available
- **Prevention**: Verify buyer is available before selection

#### **Order Management Errors**
- **Error**: Order creation fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have order creation permissions** via employee group assignments
3. **Items must be configured** in the system
4. **Batches must be available** for order creation
5. **Buyers must be configured** in the system
6. **Order workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Order creation permissions must be configured
- Item data must be current
- Batch data must be available
- Buyer data must be current
- Order workflow must be enabled

### Success Criteria

#### **For Item Selection**
- ✅ Item dropdown populated with active items only
- ✅ Item validation ensures proper batch loading
- ✅ Item selection enables batch filtering

#### **For Batch Selection**
- ✅ Batch dropdown populated with batches having available quantity
- ✅ Batch validation ensures proper details loading
- ✅ Batch selection enables details display

#### **For Unit Price Input**
- ✅ Unit price field accepts valid numeric input
- ✅ Unit price validation ensures proper order creation
- ✅ Unit price values are positive and reasonable

#### **For Sell Quantity Input**
- ✅ Sell quantity field accepts valid numeric input
- ✅ Sell quantity validation ensures proper order creation
- ✅ Sell quantity values are positive and reasonable

#### **For Buyer Selection**
- ✅ Buyer dropdown populated with active buyers only
- ✅ Buyer validation ensures proper order creation
- ✅ Buyer selection enables order workflow

#### **For Order Management**
- ✅ Order creation creates proper order records
- ✅ Item edit modifies items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Order workflow works with proper validation
- ✅ Order completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for sale order creation

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
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbbatch" DataSourceID="dsBatches" TextField="batch_no" ValueField="batch_no" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="cbbatch_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="batch_no" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Price and Quantity Section

```html
<!-- Price and Quantity -->
<dx:BootstrapLayoutItem Caption="سعر وحدة الصرف" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtUnitPrice" runat="server" DisplayFormatString="0" AutoPostBack="true" OnTextChanged="txtUnitPrice_ValueChanged"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الكمية المباعة" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtSellQuantity" runat="server" DisplayFormatString="0" AutoPostBack="true" OnTextChanged="txtUnitPrice_ValueChanged"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="اجمالى القيمة" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtTotalPrice" runat="server" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Details Grid Section

```html
<!-- Item Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdItemDetails" AutoPostBack="true" runat="server" AutoGenerateColumns="False" KeyFieldName="ID" EnableCallBacks="false" DataSourceID="dsshowItems">
                <Columns>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" VisibleIndex="1" Caption="اسم المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storeid" VisibleIndex="2" Visible="false" Caption="كود المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" VisibleIndex="3" Caption="تاريخ الصلاحية"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" VisibleIndex="4" Caption="وحدة التخزين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="AvailableAmount" VisibleIndex="5" Caption="الرصيد"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" VisibleIndex="6" Caption="سعر الوحدة" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="TotalPriceAmount" VisibleIndex="7" Visible="false" Caption="اجمالى القيمة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="SupplierName" VisibleIndex="8" Caption="اسم المورد"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" VisibleIndex="9" Caption="رقم فاتورة التوريد"></dx:BootstrapGridViewTextColumn>
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

### Buyer Selection Section

```html
<!-- Buyer Selection -->
<dx:BootstrapLayoutItem Caption="كود المشترى" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbSuppliers" TextField="FullName" ValueField="ID" DataSourceID="suplliersDS" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="FullName" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Order Management Buttons Section

```html
<!-- Order Management Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="addbtn" runat="server" Text="اضافة" AutoPostBack="true" Width="15%" OnClick="addbtn_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
            <dx:BootstrapButton ID="editbtn" runat="server" Text="تعديل" AutoPostBack="true" Width="15%" OnClick="editbtn_Click">
                <SettingsBootstrap RenderOption="info" />
            </dx:BootstrapButton>
            <dx:BootstrapButton ID="deletebtn" runat="server" Text="حذف" AutoPostBack="true" Width="15%" OnClick="deletebtn_Click">
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Order Items Grid Section

```html
<!-- Order Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdItemsSellDetails" AutoPostBack="true" runat="server" AutoGenerateColumns="False" KeyFieldName="id" EnableCallBacks="false" DataSourceID="SellDetailsDS" OnCustomColumnDisplayText="grdItemsSellDetails_CustomColumnDisplayText" OnSelectionChanged="grdItemsSellDetails_SelectionChanged">
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn VisibleIndex="1" Caption="مسلسل"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Name" VisibleIndex="2" Caption="اسم الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Code" VisibleIndex="3" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_No" VisibleIndex="4" Caption="الدفعة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inventory_Name" VisibleIndex="5" Caption="اسم المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exp_Date" VisibleIndex="6" Caption="تاريخ الصلاحية"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Unit" VisibleIndex="7" Caption="وحدة التخزين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="available_amount" VisibleIndex="8" Caption="الرصيد"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="total_PriceAvailableAmount" VisibleIndex="9" Caption="اجمالى القيمة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="SupplierCode" VisibleIndex="10" Caption="كود المورد"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="SupplyInvoiceNumber" VisibleIndex="11" Caption="رقم فاتورة التوريد"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="BuyerName" VisibleIndex="12" Caption="مسمى المشترى"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="price_Unit" VisibleIndex="13" Caption="سعر البيع بوحدة الصرف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="sellQuantity" VisibleIndex="14" Caption="الكمية المباعة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="BuyerCode" Visible="false" Caption="كود المشترى"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="TotalSellValue" VisibleIndex="15" Caption="اجمالى القيمة المباعة"></dx:BootstrapGridViewTextColumn>
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

### Order Creation Button Section

```html
<!-- Order Creation Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="Create" runat="server" Text="طلب البيع" AutoPostBack="true" Width="15%" OnClick="Create_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Item Parameters**:
- `@itemcode` - Item code for filtering batches
- `@itemCode` - Item code for filtering details

**Batch Parameters**:
- `@batchNo` - Batch number for filtering details

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Item Selection**: Loads batches based on selected item
3. **Batch Selection**: Loads details based on selected batch
4. **Unit Price Entry**: Enters unit price for order
5. **Sell Quantity Entry**: Enters sell quantity for order
6. **Total Price Calculation**: Calculates total price for order
7. **Buyer Selection**: Selects buyer for order
8. **Item Addition**: Adds item to temporary order grid
9. **Item Edit**: Edits item in temporary order grid
10. **Item Delete**: Deletes item from temporary order grid
11. **Order Creation**: Creates complete sale order

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads item information
3. Sets default order state
4. Initializes date displays

### cbitem_SelectedIndexChanged Method

```csharp
protected void cbitem_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batches based on selected item

**Process**:
1. Validates item selection
2. Sets parameters for batch data source
3. Binds batch dropdown
4. Updates item information display

### cbbatch_SelectedIndexChanged Method

```csharp
protected void cbbatch_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads details based on selected batch

**Process**:
1. Validates batch selection
2. Sets parameters for details data source
3. Binds details grid
4. Updates batch information display

### txtUnitPrice_ValueChanged Method

```csharp
protected void txtUnitPrice_ValueChanged(object sender, EventArgs e)
```

**Purpose**: Calculates total price based on unit price and sell quantity

**Process**:
1. Validates unit price is greater than 0
2. Validates sell quantity is greater than 0
3. Calculates total price
4. Updates total price display

### addbtn_Click Method

```csharp
protected void addbtn_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary order grid

**Process**:
1. Validates all required fields are filled
2. Validates unit price is greater than 0
3. Validates sell quantity is greater than 0
4. Validates buyer is selected
5. Checks item availability
6. Inserts item into temporary table
7. Refreshes temporary order grid
8. Clears form fields for next addition

### editbtn_Click Method

```csharp
protected void editbtn_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary order grid

**Process**:
1. Validates item selection
2. Validates all required fields are filled
3. Validates unit price is greater than 0
4. Validates sell quantity is greater than 0
5. Updates item in temporary table
6. Refreshes temporary order grid
7. Clears form fields for next edit

### deletebtn_Click Method

```csharp
protected void deletebtn_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary order grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary order grid
4. Provides success feedback

### Create_Click Method

```csharp
protected void Create_Click(object sender, EventArgs e)
```

**Purpose**: Creates complete sale order

**Process**:
1. Validates at least one item is added
2. Generates new order document number
3. Inserts order header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item list for filtering
- **Filtering**: Only active items

#### **Inventories_Stock**
- **Purpose**: Stock records with batch information
- **Key Fields**: ID, Itemcode, batch_no, Quantity_storage, Amount_Done, Amount_Done_Exchange, Unit_Exchange_quanity, MoveType, storeid, Expiration_date, ItemUnit_storage_Id, PO_ID_FK, inv_num
- **Usage**: Tracks batch information for order creation
- **Filtering**: Only batches with available quantity

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, Store_type, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores with Store_type=1

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **purches_Supplier_record**
- **Purpose**: Supplier/buyer master data
- **Key Fields**: Supplier_code, Arabic_name, deleted
- **Usage**: Provides buyer list for filtering
- **Filtering**: Only active buyers (deleted=0)

#### **Inventories_Sell_Temp**
- **Purpose**: Temporary sell order records before save
- **Key Fields**: id, item_Name, item_Code, batch_No, inventory_Name, exp_Date, storage_Unit, available_amount, price_Unit, total_PriceAvailableAmount, SupplierCode, SupplyInvoiceNumber, sellQuantity, TotalSellValue, BuyerCode, BuyerName
- **Usage**: Tracks sell order items before save

#### **Inventories_procedures_orderEffect**
- **Purpose**: Procedure order effect configuration
- **Key Fields**: procedure_id, quantity_effect
- **Usage**: Defines which procedures affect quantity
- **Filtering**: Only procedures with quantity_effect=1

#### **Purchese_PO_Order_Header**
- **Purpose**: Purchase order header information
- **Key Fields**: ID, Sup_Code_fk
- **Usage**: Links stock to purchase orders
- **Filtering**: Only purchase orders with supplier codes

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing order data

#### **Item Filtering**
```sql
select item_code, arabic_name from Inventories_Item_Settings
```

**Filtering Logic**: Shows all items for user
**Permission Logic**: All items are available
**Validation**: Ensures item has batches

#### **Batch Filtering**
```sql
select batch_no from Inventories_Stock ins 
inner join Inventories_Item_Settings its on its.item_code=ins.Itemcode 
where itemcode=@itemcode and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) 
and storeid in(select id from Inventories_wharehouse_store where Store_type=1) 
group by batch_no 
having FLOOR(sum((ins.Quantity_storage-(ins.Amount_Done + (ins.Amount_Done_Exchange / Unit_Exchange_quanity) ))))>0
```

**Filtering Logic**: Shows only batches with available quantity
**Permission Logic**: Only batches with available quantity are available
**Validation**: Ensures batch has available quantity

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to item, batch, and buyer dropdowns

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Checkbox Selection Function

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Checkbox Logic**: Ensures only one checkbox is selected at a time
**User Experience**: Provides single selection behavior for grid
**Usage**: Applied to grid checkboxes for single selection

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Popup Handling Function

```javascript
var keyValue;
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Popup Logic**: Handles popup display and callback
**User Experience**: Provides detailed information display
**Usage**: Applied to grid for detailed information display

### Back Button Prevention Function

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Back Button Logic**: Prevents browser back button usage
**User Experience**: Ensures proper workflow navigation
**Usage**: Applied to page for workflow security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Item and Batch Selection Section**
```html
<!-- Item and Batch Selection -->
<dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="8">
<dx:BootstrapLayoutItem Caption="الدفعة" ColSpanMd="8">
```

#### **2. Price and Quantity Section**
```html
<!-- Price and Quantity -->
<dx:BootstrapLayoutItem Caption="سعر وحدة الصرف" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="الكمية المباعة" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="اجمالى القيمة" ColSpanMd="3">
```

#### **3. Item Details Grid Section**
```html
<!-- Item Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Buyer Selection Section**
```html
<!-- Buyer Selection -->
<dx:BootstrapLayoutItem Caption="كود المشترى" ColSpanMd="6">
```

#### **5. Order Management Buttons Section**
```html
<!-- Order Management Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **6. Order Items Grid Section**
```html
<!-- Order Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **7. Order Creation Button Section**
```html
<!-- Order Creation Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Item Data Source
SqlDataSource dsItem = new SqlDataSource();
dsItem.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsItem.SelectCommand = "select item_code, arabic_name from Inventories_Item_Settings";

// Batch Data Source
SqlDataSource dsBatches = new SqlDataSource();
dsBatches.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsBatches.SelectCommand = "select batch_no from Inventories_Stock ins inner join Inventories_Item_Settings its on its.item_code=ins.Itemcode where itemcode=@itemcode and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) and storeid in(select id from Inventories_wharehouse_store where Store_type=1) group by batch_no having FLOOR(sum((ins.Quantity_storage-(ins.Amount_Done + (ins.Amount_Done_Exchange / Unit_Exchange_quanity) ))))>0";

// Item Details Data Source
SqlDataSource dsshowItems = new SqlDataSource();
dsshowItems.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsshowItems.SelectCommand = "select ist.ID, ist.storeid, ws.arabic_name, ist.Expiration_date, uom.description, ist.inv_num, ist.Itemcode, (select Arabic_name from purches_Supplier_record where Supplier_code=hd.Sup_Code_fk) as SupplierName, (iss.latest_Unit_price_usage*ist.Unit_Exchange_quanity) as Price_unit, FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) )))) as AvailableAmount, (FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))*(iss.latest_Unit_price_usage*ist.Unit_Exchange_quanity)) as TotalPriceAmount from Inventories_Stock ist inner join Inventories_UOM uom on uom.id = ist.ItemUnit_storage_Id inner join Inventories_Item_Settings iss on iss.item_code=ist.Itemcode inner join Inventories_wharehouse_store ws on ws.id=ist.storeid left join Purchese_PO_Order_Header hd on hd.ID=ist.PO_ID_FK where ist.Itemcode=@itemCode and ist.batch_no=@batchNo and storeid in(select id from Inventories_wharehouse_store where Store_type=1) and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) group by ist.Itemcode, ist.ID, ist.storeid, ist.Expiration_date, uom.description, iss.latest_Unit_price_usage, ws.arabic_name, hd.Sup_Code_fk, ist.inv_num, ist.Unit_Exchange_quanity having FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))>0 order by AvailableAmount asc";

// Buyer Data Source
SqlDataSource suplliersDS = new SqlDataSource();
suplliersDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
suplliersDS.SelectCommand = "select Supplier_code as ID, Arabic_name as FullName from purches_Supplier_record where deleted=0";

// Order Items Data Source
SqlDataSource SellDetailsDS = new SqlDataSource();
SellDetailsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SellDetailsDS.SelectCommand = "Select id, item_Name, item_Code, batch_No, inventory_Name, exp_Date, storage_Unit, available_amount, price_Unit, total_PriceAvailableAmount, SupplierCode, SupplyInvoiceNumber, sellQuantity, TotalSellValue, BuyerCode, BuyerName from Inventories_Sell_Temp";
```

## Business Logic and Validation

### Item Selection Validation

```csharp
protected void cbitem_SelectedIndexChanged(object sender, EventArgs e)
{
    if (cbitem.Value == "" || cbitem.Value == null)
    {
        // Clear batch dropdown
        cbbatch.DataSource = null;
        cbbatch.DataBind();
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading batches
**Error Prevention**: Prevents batch loading without item selection

### Batch Selection Validation

```csharp
protected void cbbatch_SelectedIndexChanged(object sender, EventArgs e)
{
    if (cbbatch.Value == "" || cbbatch.Value == null)
    {
        // Clear details grid
        grdItemDetails.DataSource = null;
        grdItemDetails.DataBind();
        return;
    }
    // ... additional validation
}
```

**Batch Logic**: Validates batch selection before loading details
**Error Prevention**: Prevents details loading without batch selection

### Unit Price Validation

```csharp
protected void txtUnitPrice_ValueChanged(object sender, EventArgs e)
{
    if (Convert.ToDecimal(txtUnitPrice.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال سعر وحدة الصرف');", true);
        return;
    }
    // ... additional validation
}
```

**Unit Price Logic**: Validates unit price is positive and within limits
**Error Prevention**: Prevents order creation with invalid unit price

### Sell Quantity Validation

```csharp
protected void txtUnitPrice_ValueChanged(object sender, EventArgs e)
{
    if (Convert.ToDecimal(txtSellQuantity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية المباعة');", true);
        return;
    }
    // ... additional validation
}
```

**Sell Quantity Logic**: Validates sell quantity is positive and within limits
**Error Prevention**: Prevents order creation with invalid sell quantity

### Buyer Selection Validation

```csharp
protected void addbtn_Click(object sender, EventArgs e)
{
    if (cbSuppliers.Value == "" || cbSuppliers.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار كود المشترى');", true);
        return;
    }
    // ... additional validation
}
```

**Buyer Logic**: Validates buyer selection before order creation
**Error Prevention**: Prevents order creation without buyer selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Item Selection Validation**: Must select item before loading batches
- **Batch Selection Validation**: Must select batch before loading details
- **Unit Price Validation**: Must enter unit price before order creation
- **Sell Quantity Validation**: Must enter sell quantity before order creation
- **Buyer Selection Validation**: Must select buyer before order creation

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Item Validation**: Ensures item is active and available
- **Batch Validation**: Ensures batch has available quantity
- **Unit Price Validation**: Ensures unit price is positive and within limits
- **Sell Quantity Validation**: Ensures sell quantity is positive and within limits
- **Buyer Validation**: Ensures buyer is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Item Access**: Ensures user has access to selected item
- **Order Access**: Ensures user can access and modify order records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)
- **Order Creation Success**: "تم انشاء طلب البيع" (Sale order created successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Sale Order Management System**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch information
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier/buyer master data
  - `Inventories_Sell_Temp` - Temporary sell order records
  - `Inventories_procedures_orderEffect` - Procedure order effect configuration
  - `Purchese_PO_Order_Header` - Purchase order header information
- **Integration Details**:
  - Item selection controls batch filtering
  - Batch selection controls details display
  - Details displayed with complete information
  - Order creation tracked with complete information
- **Data Flow**:
  - Items filtered for user access
  - Batches filtered by item
  - Details filtered by batch
  - Order creation tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all order operations
  - Item access controlled by user permissions

### Data Exchange

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch information
- **Real-time Data**:
  - Item information for filtering
  - Batch information for order creation
  - Details information and calculations
- **Data Relationships**:
  - Items linked to batches via Itemcode
  - Batches linked to details via batch_no
  - Order creation tracked by user

#### **Order and Buyer Information**
- **Database Tables**:
  - `Inventories_Sell_Temp` - Temporary sell order records
  - `purches_Supplier_record` - Supplier/buyer master data
- **Real-time Data**:
  - Order details and descriptions
  - Order quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Orders linked to items via item_Code
  - Orders linked to buyers via BuyerCode
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before loading batches
- **Solution**: Always select item before loading batches
- **Prevention**: Item selection is required for all order operations

#### **"الرجاء اختيار الدفعة" Error**
- **Cause**: Batch not selected before loading details
- **Solution**: Always select batch before loading details
- **Prevention**: Batch selection is required for all order operations

#### **"الرجاء ادخال سعر وحدة الصرف" Error**
- **Cause**: Unit price not entered before order creation
- **Solution**: Always enter unit price before order creation
- **Prevention**: Unit price entry is required for all order operations

#### **"الرجاء ادخال الكمية المباعة" Error**
- **Cause**: Sell quantity not entered before order creation
- **Solution**: Always enter sell quantity before order creation
- **Prevention**: Sell quantity entry is required for all order operations

#### **"الرجاء اختيار كود المشترى" Error**
- **Cause**: Buyer not selected before order creation
- **Solution**: Always select buyer before order creation
- **Prevention**: Buyer selection is required for all order operations

#### **No Items Found**
- **Cause**: Item has no batches
- **Solution**: Verify item has batches before selection
- **Prevention**: Ensure items have batches

#### **Order Creation Failed Error**
- **Cause**: Order cannot be created
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before order creation

#### **Item Edit Failed Error**
- **Cause**: Item cannot be edited
- **Solution**: Verify item is selected from temporary grid
- **Prevention**: Ensure proper selection before editing

#### **Item Delete Failed Error**
- **Cause**: Item cannot be deleted
- **Solution**: Verify item is selected from temporary grid
- **Prevention**: Ensure proper selection before deletion

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Order Access**: Access to order operations
- **Item Access**: Access to items with batches

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Order Workflow**: Understanding of order creation process
- **Item Management**: Knowledge of item selection and batch filtering
- **Order Management**: Knowledge of order creation and management
- **Order Management**: Familiarity with order creation and deletion operations

## Usage Examples

### Basic Order Creation Workflow

1. **Page Load**: Verify page loads with default data
2. **Item Selection**: Select item for order creation
3. **Batch Selection**: Select batch for order creation
4. **Unit Price Entry**: Enter unit price for order
5. **Sell Quantity Entry**: Enter sell quantity for order
6. **Total Price Calculation**: Calculate total price for order
7. **Buyer Selection**: Select buyer for order
8. **Item Addition**: Add item to temporary order grid
9. **Repeat Items**: Add additional order items as needed
10. **Order Creation**: Create complete sale order

### Order Management Workflow

1. **Item Selection**: Select item for order creation
2. **Batch Selection**: Select batch for order creation
3. **Unit Price Entry**: Enter unit price for order
4. **Sell Quantity Entry**: Enter sell quantity for order
5. **Total Price Calculation**: Calculate total price for order
6. **Buyer Selection**: Select buyer for order
7. **Item Addition**: Add item to temporary order grid
8. **Item Review**: Review items in temporary order grid
9. **Item Edit**: Edit items in temporary order grid
10. **Item Delete**: Remove items from temporary order grid
11. **Order Completion**: Create order with all validated items

### Multi-Item Order Management

1. **Item Selection**: Select item for order creation
2. **Multiple Batch Selection**: Select multiple batches for order creation
3. **Unit Price Entry**: Enter unit price for each batch
4. **Sell Quantity Entry**: Enter sell quantity for each batch
5. **Total Price Calculation**: Calculate total price for each batch
6. **Buyer Selection**: Select buyer for order
7. **Item Addition**: Add all items to temporary order grid
8. **Order Creation**: Create complete order with all items
9. **Order Verification**: Verify order is created correctly