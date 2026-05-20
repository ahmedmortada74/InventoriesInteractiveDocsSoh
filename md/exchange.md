← Go back to 
[Inventories Module Documentation](/Inventories)

# exchange.aspx

## Overview

**File**: `\Inventories\Process\exchange.aspx`
**Purpose**: Item replacement and exchange request system for inventory management with committee-based approval workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory supervisors, exchange committee members, replacement request personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Exchange Committee Selection (Required for Request)**
- **Committee Dropdown**: Must select valid exchange committee for replacement request
- **Error Prevention**: System validates committee is selected before loading items
- **Data Source**: Inventories_check_header table filtered by exchange type and active status
- **Default Behavior**: User must select committee manually
- **Error Message**: Validation prevents item loading without committee selection
- **Validation**: Only active committees (check_id=2, active=1, temp_exp=0) are available

#### 2. **Item Selection (Required for Exchange)**
- **Item Dropdown**: Must select valid item for exchange from inventory
- **Error Prevention**: System validates item is selected before loading batches
- **Data Source**: Inventories_Item_Settings table with all active items
- **Default Behavior**: User must select item manually
- **Error Message**: Validation prevents batch loading without item selection
- **Validation**: Only active items are available

#### 3. **Batch Selection (Required for Exchange)**
- **Batch Dropdown**: Must select valid batch for exchange from selected item
- **Error Prevention**: System validates batch is selected before loading stock details
- **Data Source**: Inventories_Stock table filtered by item and batch
- **Default Behavior**: User must select batch manually
- **Error Message**: Validation prevents stock loading without batch selection
- **Validation**: Only batches with available stock are available

#### 4. **Exchange Quantity Input (Required for Exchange)**
- **Quantity Field**: Must enter valid quantity for exchange
- **Error Prevention**: System validates quantity is greater than 0 and within available stock
- **Data Source**: User input with validation
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents exchange with zero or negative quantity
- **Validation**: Quantity must be positive and within available stock

#### 5. **Exchange Price Input (Required for Exchange)**
- **Price Field**: Must enter valid unit price for exchange
- **Error Prevention**: System validates price is greater than 0
- **Data Source**: User input with validation
- **Default Behavior**: User must enter price manually
- **Error Message**: Validation prevents exchange with zero or negative price
- **Validation**: Price must be positive number

#### 6. **Exchange Item Selection (Required for Replacement)**
- **Exchange Item Dropdown**: Must select valid replacement item from committee-approved items
- **Error Prevention**: System validates exchange item is selected before adding to request
- **Data Source**: Inventories_Item_Settings filtered by committee item type
- **Default Behavior**: User must select exchange item manually
- **Error Message**: Validation prevents addition without exchange item selection
- **Validation**: Only committee-approved items are available

#### 7. **Exchange Item Details (Required for Replacement)**
- **Expiration Date**: Must select valid expiration date for replacement item
- **Purchase Unit**: Must select valid purchase unit for replacement item
- **Exchange Quantity**: Must enter valid quantity for replacement item
- **Exchange Price**: Must enter valid unit price for replacement item
- **Error Prevention**: System validates all exchange item details before adding
- **Data Source**: User input with validation
- **Default Behavior**: User must enter all details manually
- **Error Message**: Validation prevents addition without complete exchange item details
- **Validation**: All fields must be properly filled

### Common Error Scenarios and Prevention

#### **Committee and Item Selection Errors**
- **Error**: No committee selected
- **Prevention**: Always select committee before loading items
- **Error**: No item selected
- **Prevention**: Always select item before loading batches
- **Error**: No batch selected
- **Prevention**: Always select batch before entering exchange details

#### **Exchange Quantity and Price Errors**
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Zero or negative price
- **Prevention**: Always enter positive price values
- **Error**: Quantity exceeds available stock
- **Prevention**: System validates quantity against available stock

#### **Exchange Item Errors**
- **Error**: No exchange item selected
- **Prevention**: Always select exchange item before adding to request
- **Error**: No expiration date selected
- **Prevention**: Always select expiration date for replacement item
- **Error**: No purchase unit selected
- **Prevention**: Always select purchase unit for replacement item
- **Error**: No exchange quantity entered
- **Prevention**: Always enter exchange quantity for replacement item
- **Error**: No exchange price entered
- **Prevention**: Always enter exchange price for replacement item

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before creating request
- **Error**: Request creation fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have exchange request permissions** via employee group assignments
3. **Exchange committee must be configured** with proper item type restrictions
4. **Items must have available stock** in inventory
5. **Exchange workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Exchange request permissions must be configured
- Committee configuration must be current
- Item inventory data must be current
- Exchange workflow must be enabled

### Success Criteria

#### **For Committee and Item Selection**
- ✅ Committee dropdown populated with active exchange committees only
- ✅ Item dropdown populated with all active items
- ✅ Batch dropdown populated based on selected item and available stock
- ✅ Committee validation prevents item loading without selection

#### **For Exchange Details**
- ✅ Quantity validation ensures positive values and within stock limits
- ✅ Price validation ensures positive values only
- ✅ Total value calculation displays properly
- ✅ Stock information shows available quantities

#### **For Exchange Item Selection**
- ✅ Exchange item dropdown populated with committee-approved items only
- ✅ Expiration date validation ensures valid date selection
- ✅ Purchase unit validation ensures proper unit selection
- ✅ Exchange quantity and price validation ensures positive values

#### **For Request Management**
- ✅ Item addition updates temporary exchange grid successfully
- ✅ Item edit updates existing items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Request creation saves complete exchange request

#### **For Data Management**
- ✅ Temporary exchange grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for exchange requests

### Committee and Document Section

```html
<!-- Committee and Document Selection -->
<dx:BootstrapLayoutItem Caption="كود لجنة الاستبدال" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="txtcheck" TextField="description" ValueField="ID" DataSourceID="check_ds" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem Caption="رقم مستند الطلب" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtfile" runat="server" Enabled="false" AutoPostBack="true"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Item Selection Section

```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cb_item" DropDownStyle="DropDownList" TextField="arabic_name" ValueField="item_code" DataSourceID="item_ds" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" OnSelectedIndexChanged="cb_item_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الدفعة" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbbatch" DataSourceID="dsBatches" ValueField="batch_no" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="cbbatch_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="batch_no" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Exchange Details Section

```html
<!-- Exchange Details -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الكمية المستبدلة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="exQuntity" ReadOnly="false" AutoPostBack="true" AllowMouseWheel="false" OnNumberChanged="exQuntity_NumberChanged"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="سعر الوحدة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="ex_price" ReadOnly="false" AutoPostBack="true" AllowMouseWheel="false" OnNumberChanged="ex_price_NumberChanged"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="اجمالي القيمة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="ex_total" runat="server" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Stock Information Grid Section

```html
<!-- Stock Information Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="grid">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView AutoPostBack="true" ID="ItemsGridView" runat="server" AutoGenerateColumns="False" DataSourceID="Items_ds" KeyFieldName="ID" EnableCallBacks="false" OnCustomColumnDisplayText="ItemsGridView_CustomColumnDisplayText">
                <Columns>
                    <dx:BootstrapGridViewTextColumn Caption="مسلسل" VisibleIndex="0" />
                    <dx:BootstrapGridViewDataColumn FieldName="ID" VisibleIndex="1" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="storeid" Caption="المخزن" VisibleIndex="2" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم المخزن" VisibleIndex="3" />
                    <dx:BootstrapGridViewDataColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="4" />
                    <dx:BootstrapGridViewDataColumn FieldName="storage_unit" Caption="وحدة التخزين" VisibleIndex="5" />
                    <dx:BootstrapGridViewDataColumn FieldName="ItemUnit_storage_Id" Caption="وحدة التخزين" VisibleIndex="6" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_unit" Caption="وحدة الصرف" VisibleIndex="7" />
                    <dx:BootstrapGridViewDataColumn FieldName="ItemUnit_Exchange_id" Caption="وحدة الصرف" VisibleIndex="8" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="stock" Caption="الرصيد" VisibleIndex="9" />
                    <dx:BootstrapGridViewDataColumn FieldName="Unit_price" Caption="سعر الوحدة" VisibleIndex="10" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="TotalPrice" Caption="اجمالي القيمة" VisibleIndex="11" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="adding_price" Caption="سعر اخر اضافة" VisibleIndex="12" />
                    <dx:BootstrapGridViewDataColumn FieldName="avarage" Caption="سعر المتوسط الحالى" VisibleIndex="13" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplierName" Caption="كود المورد" VisibleIndex="14" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplierName1" Caption="المورد" VisibleIndex="15" />
                    <dx:BootstrapGridViewDataColumn FieldName="inv_num" Caption="رقم فاتورة التوريد" VisibleIndex="16" />
                </Columns>
                <SettingsPager PageSize="20">
                    <PageSizeItemSettings Visible="true" Items="10, 20, 50" />
                </SettingsPager>
                <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                <SettingsDataSecurity AllowEdit="False" AllowInsert="False" AllowDelete="False"></SettingsDataSecurity>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Exchange Item Selection Section

```html
<!-- Exchange Item Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الصنف المستبدل" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cb_exItem" DropDownStyle="DropDownList" TextField="arabic_name" ValueField="item_code" DataSourceID="exItem_ds" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" OnSelectedIndexChanged="cb_exItem_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="تاريخ الصلاحية" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" ID="Expirationdate" AutoPostBack="true" EnableCallBacks="false"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="كود المورد" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cb_supplier" DropDownStyle="DropDownList" TextField="Arabic_name" ValueField="Supplier_code" DataSourceID="supplier_ds" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الشراء" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="purchase_unit" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource2" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكمية" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="quntity" ReadOnly="false" AutoPostBack="true" AllowMouseWheel="false" OnNumberChanged="quntity_NumberChanged"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="سعر الوحدة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="priceUnit" ReadOnly="false" AutoPostBack="true" AllowMouseWheel="false" OnNumberChanged="priceUnit_NumberChanged"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="اجمالي القيمة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="txt_totalPrice" runat="server" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم فاتورة التوريد" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="txt_PONumber" runat="server"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="savebtn" runat="server" Text="اضافة صنف" OnClick="savebtn_Click">
                <SettingsBootstrap RenderOption="primary" />
            </dx:BootstrapButton>
            <dx:BootstrapButton ID="editbtn" runat="server" Text="تعديل الصنف" OnClick="editbtn_Click">
                <SettingsBootstrap RenderOption="info" />
            </dx:BootstrapButton>
            <dx:BootstrapButton ID="deletebtn" runat="server" Text="حذف الصنف" OnClick="deletebtn_Click">
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Temporary Exchange Grid Section

```html
<!-- Temporary Exchange Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="grid">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView AutoPostBack="true" ID="exchangeGridView" runat="server" AutoGenerateColumns="False" DataSourceID="exchange_ds" KeyFieldName="ID" EnableCallBacks="false" OnSelectionChanged="exchangeGridView_SelectionChanged" OnCustomColumnDisplayText="exchangeGridView_CustomColumnDisplayText">
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="ID" VisibleIndex="1" />
                    <dx:BootstrapGridViewTextColumn VisibleIndex="2" Visible="true" Caption="مسلسل"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="checkNum" Caption="رقم لجنة الاستبدال" VisibleIndex="3" />
                    <dx:BootstrapGridViewDataColumn FieldName="item_name" Caption="الصنف" VisibleIndex="4" />
                    <dx:BootstrapGridViewDataColumn FieldName="item_Code" Caption="الكود" VisibleIndex="5" />
                    <dx:BootstrapGridViewDataColumn FieldName="batch_No" Caption="الدفعة" VisibleIndex="6" />
                    <dx:BootstrapGridViewDataColumn FieldName="inventory_Name" Caption="المخزن" VisibleIndex="7" />
                    <dx:BootstrapGridViewDataColumn FieldName="exp_Date" Caption="تاريخ الصلاحية" VisibleIndex="8" />
                    <dx:BootstrapGridViewDataColumn FieldName="storage_Unit" Caption="وحدة التخزين" VisibleIndex="9" />
                    <dx:BootstrapGridViewDataColumn FieldName="stock" Caption="الرصيد" VisibleIndex="10" />
                    <dx:BootstrapGridViewDataColumn FieldName="Replacementquantity" Caption="كمية الاستبدال" VisibleIndex="11" />
                    <dx:BootstrapGridViewDataColumn FieldName="price_Unit" Caption="سعر الوحدة" VisibleIndex="12" />
                    <dx:BootstrapGridViewDataColumn FieldName="total_Price" Caption="اجمالي القيمة" VisibleIndex="13" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplierCode" Caption="كود المورد" VisibleIndex="14" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplyInvoiceNumber" Caption="رقم فاتورة التوريد" VisibleIndex="15" />
                    <dx:BootstrapGridViewBandColumn Caption="الصنف المستبدل به" VisibleIndex="16" CssClasses-HeaderCell="center">
                        <Columns>
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_iteemName" Caption="الصنف" />
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_iteemCode" Caption="الكود" />
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_ExpDate" Caption="تاريخ الصلاحية" />
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_purchaseUnit" Caption="وحدة الشراء" />
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_priceUnit" Caption="سعر الوحدة" />
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_quanyity" Caption="الكمية" />
                            <dx:BootstrapGridViewDataColumn FieldName="exchange_totalPrice" Caption="اجمالي القيمة" />
                            <dx:BootstrapGridViewDataColumn FieldName="User" Caption="الموظف" />
                            <dx:BootstrapGridViewDataColumn FieldName="Date" Caption="التاريخ" Visible="false" />
                        </Columns>
                    </dx:BootstrapGridViewBandColumn>
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

### Request Creation Section

```html
<!-- Request Creation -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="create" runat="server" Text="انشاء الطلب" Width="20%" OnClick="create_Click">
                <SettingsBootstrap RenderOption="success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses committee and item parameters for comprehensive data filtering:

**Committee Parameters**:
- `@ID` - Committee ID for filtering exchange items
- `@checkNum` - Committee number for exchange tracking

**Item Parameters**:
- `@itemcode` - Item code for filtering batches and stock
- `@batch_no` - Batch number for filtering stock details
- `@Itemcode` - Item code for filtering exchange items

**User Context Parameters**:
- `@User` - Username for filtering temporary exchange records

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Committee Selection**: Loads exchange items based on committee configuration
3. **Item Selection**: Loads batches based on selected item
4. **Batch Selection**: Loads stock details based on selected batch
5. **Exchange Details**: Calculates total value based on quantity and price
6. **Exchange Item Selection**: Loads exchange item details
7. **Item Addition**: Adds items to temporary exchange grid
8. **Request Creation**: Creates complete exchange request

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Sets default exchange request state
3. Initializes temporary exchange grid

### cb_item_SelectedIndexChanged Method

```csharp
protected void cb_item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batches based on selected item

**Process**:
1. Retrieves selected item code
2. Sets parameter for batch data source
3. Binds batch dropdown with filtered batches
4. Clears batch selection if needed

### cbbatch_SelectedIndexChanged Method

```csharp
protected void cbbatch_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads stock details based on selected batch

**Process**:
1. Retrieves selected batch number
2. Sets parameters for stock data source
3. Binds stock grid with filtered records
4. Clears stock selection if needed

### exQuntity_NumberChanged Method

```csharp
protected void exQuntity_NumberChanged(object sender, EventArgs e)
```

**Purpose**: Calculates total value based on exchange quantity

**Process**:
1. Retrieves exchange quantity
2. Retrieves exchange price
3. Calculates total value (quantity × price)
4. Updates total value field

### ex_price_NumberChanged Method

```csharp
protected void ex_price_NumberChanged(object sender, EventArgs e)
```

**Purpose**: Calculates total value based on exchange price

**Process**:
1. Retrieves exchange price
2. Retrieves exchange quantity
3. Calculates total value (quantity × price)
4. Updates total value field

### cb_exItem_SelectedIndexChanged Method

```csharp
protected void cb_exItem_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads exchange item details based on selected item

**Process**:
1. Retrieves selected exchange item code
2. Loads purchase units for exchange item
3. Sets default values for exchange item fields

### quntity_NumberChanged Method

```csharp
protected void quntity_NumberChanged(object sender, EventArgs e)
```

**Purpose**: Calculates total value for exchange item based on quantity

**Process**:
1. Retrieves exchange item quantity
2. Retrieves exchange item price
3. Calculates total value (quantity × price)
4. Updates total value field

### priceUnit_NumberChanged Method

```csharp
protected void priceUnit_NumberChanged(object sender, EventArgs e)
```

**Purpose**: Calculates total value for exchange item based on price

**Process**:
1. Retrieves exchange item price
2. Retrieves exchange item quantity
3. Calculates total value (quantity × price)
4. Updates total value field

### savebtn_Click Method

```csharp
protected void savebtn_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary exchange grid

**Process**:
1. Validates all required fields are filled
2. Validates exchange quantity and price
3. Validates exchange item details
4. Inserts item into temporary exchange table
5. Refreshes temporary exchange grid
6. Clears form fields for next addition

### editbtn_Click Method

```csharp
protected void editbtn_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary exchange grid

**Process**:
1. Validates item selection from temporary grid
2. Validates all required fields are filled
3. Updates item in temporary exchange table
4. Refreshes temporary exchange grid
5. Clears form fields after edit

### deletebtn_Click Method

```csharp
protected void deletebtn_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary exchange grid

**Process**:
1. Validates item selection from temporary grid
2. Deletes item from temporary exchange table
3. Refreshes temporary exchange grid
4. Clears form fields after deletion

### create_Click Method

```csharp
protected void create_Click(object sender, EventArgs e)
```

**Purpose**: Creates complete exchange request

**Process**:
1. Validates at least one item is added
2. Generates new exchange request number
3. Inserts exchange request header
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_check_header**
- **Purpose**: Committee configuration for exchange workflow
- **Key Fields**: ID, description, check_id, Item_type_id, active, temp_exp
- **Status Values**: check_id=2 (exchange committee), active=1 (active), temp_exp=0 (permanent)
- **Usage**: Provides committee options for exchange workflow

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, latest_Unit_price, latest_Unit_price_usage
- **Usage**: Provides item information for exchange selection

#### **Inventories_Stock**
- **Purpose**: Stock records with batch and quantity tracking
- **Key Fields**: ID, Itemcode, batch_no, storeid, Quantity_storage, Amount_Done, Amount_Done_Exchange, Unit_Exchange_quanity, ItemUnit_storage_Id, ItemUnit_Exchange_id, PO_ID_FK, inv_num, Expiration_date
- **Usage**: Tracks stock availability for exchange operations

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, Store_type
- **Usage**: Provides store information for stock display

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, active
- **Usage**: Provides unit options for exchange items

#### **Inventories_UOM_item_unit**
- **Purpose**: Item unit associations
- **Key Fields**: item_code, unit_id, unit_type_id
- **Usage**: Links items to units for proper unit selection

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name
- **Usage**: Provides supplier information for exchange items

#### **Inventories_exchangeTemp**
- **Purpose**: Temporary exchange records before request creation
- **Key Fields**: ID, checkNum, item_Code, batch_No, inventory_code, exp_Date, storage_Unit, stock, Replacementquantity, price_Unit, total_Price, SupplierCode, SupplyInvoiceNumber, exchange_iteemCode, exchange_ExpDate, exchange_purchaseUnit, exchange_quanyity, exchange_priceUnit, exchange_totalPrice, User, Date
- **Usage**: Tracks exchange items before request save

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing exchange operations

#### **Committee Filtering**
```sql
select ID,description from Inventories_check_header where check_id=2 and active=1 and temp_exp = 0
```

**Filtering Logic**: Shows only active exchange committees
**Permission Logic**: Only committees with check_id=2 are available
**Validation**: Ensures committee is active and permanent

#### **Item Filtering**
```sql
select iis.item_code,iis.arabic_name from Inventories_Item_Settings iis
```

**Filtering Logic**: Shows all active items
**Permission Logic**: All active items are available for exchange
**Validation**: Ensures items are active

#### **Batch Filtering**
```sql
select distinct batch_no from Inventories_Stock ins 
where itemcode=@itemcode
and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1)   
and storeid in(select id from Inventories_wharehouse_store where Store_type=1)
GROUP BY batch_no
HAVING (FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))) > 0
```

**Filtering Logic**: Shows only batches with available stock
**Permission Logic**: Only batches with quantity > 0 are available
**Validation**: Ensures batch has sufficient stock for exchange

## Client-Side JavaScript

### AutoPostBack Handling

```javascript
// AutoPostBack controls handle server-side events
// BootstrapComboBox with AutoPostBack="true"
// BootstrapSpinEdit with AutoPostBack="true"
```

**AutoPostBack Logic**: Controls automatically post back to server on selection/input
**User Experience**: Provides immediate feedback and data updates
**Usage**: Applied to committee, item, batch, and exchange item dropdowns

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Committee and Document Section**
```html
<!-- Committee and Document Selection -->
<dx:BootstrapLayoutItem Caption="كود لجنة الاستبدال" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="رقم مستند الطلب" ColSpanMd="2">
```

#### **2. Item Selection Section**
```html
<!-- Item Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="الدفعة" ColSpanMd="6">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Exchange Details Section**
```html
<!-- Exchange Details -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الكمية المستبدلة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="سعر الوحدة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="اجمالي القيمة" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Stock Information Grid Section**
```html
<!-- Stock Information Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="grid">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsGridView" runat="server" OnCustomColumnDisplayText="ItemsGridView_CustomColumnDisplayText">
```

#### **5. Exchange Item Selection Section**
```html
<!-- Exchange Item Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الصنف المستبدل" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="تاريخ الصلاحية" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="كود المورد" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="وحدة الشراء" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكمية" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="سعر الوحدة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="اجمالي القيمة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم فاتورة التوريد" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **6. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="savebtn" runat="server" Text="اضافة صنف" OnClick="savebtn_Click">
            <dx:BootstrapButton ID="editbtn" runat="server" Text="تعديل الصنف" OnClick="editbtn_Click">
            <dx:BootstrapButton ID="deletebtn" runat="server" Text="حذف الصنف" OnClick="deletebtn_Click">
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

#### **7. Temporary Exchange Grid Section**
```html
<!-- Temporary Exchange Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="grid">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="exchangeGridView" runat="server" OnSelectionChanged="exchangeGridView_SelectionChanged">
```

#### **8. Request Creation Section**
```html
<!-- Request Creation -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="create" runat="server" Text="انشاء الطلب" Width="20%" OnClick="create_Click">
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Committee Data Source
SqlDataSource check_ds = new SqlDataSource();
check_ds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
check_ds.SelectCommand = "select ID,description from Inventories_check_header where check_id=2 and active=1 and temp_exp = 0";

// Item Data Source
SqlDataSource item_ds = new SqlDataSource();
item_ds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
item_ds.SelectCommand = "select iis.item_code,iis.arabic_name from Inventories_Item_Settings iis";

// Batch Data Source
SqlDataSource dsBatches = new SqlDataSource();
dsBatches.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsBatches.SelectCommand = "select distinct batch_no from Inventories_Stock ins where itemcode=@itemcode and MoveType in (select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) and storeid in(select id from Inventories_wharehouse_store where Store_type=1) GROUP BY batch_no HAVING (FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))) > 0";

// Stock Data Source
SqlDataSource Items_ds = new SqlDataSource();
Items_ds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Items_ds.SelectCommand = "select ist.ID,ist.storeid,ws.arabic_name,ist.Expiration_date as Expiration_date,ist.ItemUnit_storage_Id,(select description from Inventories_UOM where ID=ist.ItemUnit_storage_Id) as storage_unit,ist.ItemUnit_Exchange_id,(select description from Inventories_UOM where ID=ist.ItemUnit_Exchange_id) as exchange_unit,(select s.Supplier_code from purches_Supplier_record s inner join Purchese_PO_Order_Header p on p.Sup_Code_fk=s.Supplier_code where p.ID=ist.PO_ID_FK) as SupplierName,(select s.Arabic_name from purches_Supplier_record s inner join Purchese_PO_Order_Header p on p.Sup_Code_fk=s.Supplier_code where p.ID=ist.PO_ID_FK) as SupplierName1,ist.inv_num,iss.latest_Unit_price as Unit_price,iss.latest_Unit_price_usage as avarage,(FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))) as stock,(FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))*iss.latest_Unit_price) as TotalPrice,(select top 1 (s.Price_unit) from Inventories_Stock s where s.MoveType=1 and s.Itemcode=ist.Itemcode order by ID desc) as adding_price from Inventories_Stock ist inner join Inventories_UOM uom on uom.id = ist.ItemUnit_storage_Id inner join Inventories_Item_Settings iss on iss.item_code=ist.Itemcode inner join Inventories_wharehouse_store ws on ws.id=ist.storeid left join Purchese_PO_Order_Header PO on PO.ID=ist.PO_ID_FK where ist.Itemcode=@Itemcode and ist.batch_no=@batch_no and storeid in(select id from Inventories_wharehouse_store where Store_type=1) and MoveType in(select procedure_id from Inventories_procedures_orderEffect where quantity_effect=1) group by ist.ID,ist.storeid,ist.Expiration_date,uom.description,iss.latest_Unit_price,ws.arabic_name,PO.Sup_Code_fk,ist.inv_num,ist.PO_ID_FK,ItemUnit_storage_Id,Itemcode,latest_Unit_price_usage,ItemUnit_Exchange_id,batch_no HAVING (FLOOR(sum((Quantity_storage-(Amount_Done + (Amount_Done_Exchange / Unit_Exchange_quanity) ))))) > 0 ORDER BY stock ASC";

// Exchange Item Data Source
SqlDataSource exItem_ds = new SqlDataSource();
exItem_ds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
exItem_ds.SelectCommand = "select ss.item_code,ss.arabic_name from Inventories_check_header hd inner join Inventories_item_type tt on tt.id=hd.Item_type_id inner join Inventories_Item_Settings ss on SUBSTRING(ss.item_code,3,2)=tt.item_code where hd.ID=@ID";

// Supplier Data Source
SqlDataSource supplier_ds = new SqlDataSource();
supplier_ds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
supplier_ds.SelectCommand = "select Supplier_code,Arabic_name from purches_Supplier_record";

// Purchase Unit Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select Inventories_UOM.id,Inventories_UOM.description from Inventories_UOM inner join Inventories_UOM_item_unit on Inventories_UOM.id=Inventories_UOM_item_unit.unit_id where unit_type_id='1' and item_code=@itemcode and (Inventories_UOM.active = 1)";

// Temporary Exchange Data Source
SqlDataSource exchange_ds = new SqlDataSource();
exchange_ds.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
exchange_ds.SelectCommand = "select t.ID,checkNum,(select arabic_name from Inventories_Item_Settings where item_code=t.item_Code) as item_name,t.item_Code,batch_No,inventory_code,ws.arabic_name as inventory_Name,exp_Date,storage_Unit,stock,price_Unit,total_Price,SupplierCode,Replacementquantity,SupplyInvoiceNumber,exchange_iteemCode,(select arabic_name from Inventories_Item_Settings where item_code=t.exchange_iteemCode) as exchange_iteemName,exchange_ExpDate,exchange_purchaseUnit,exchange_quanyity,exchange_priceUnit,exchange_totalPrice,t.[User],t.Date from Inventories_exchangeTemp t inner join Inventories_wharehouse_store ws on ws.id= t.inventory_code where t.[User]=@User";
```

## Business Logic and Validation

### Committee and Item Validation

```csharp
protected void savebtn_Click(object sender, EventArgs e)
{
    if (txtcheck.Value == "" || txtcheck.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار لجنة الاستبدال');", true);
        return;
    }
    else if (cb_item.Value == "" || cb_item.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    else if (cbbatch.Value == "" || cbbatch.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الدفعة');", true);
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates committee selection before item addition
**Item Logic**: Validates item selection before batch selection
**Batch Logic**: Validates batch selection before exchange details
**Error Prevention**: Prevents item addition without proper committee and item context

### Exchange Quantity and Price Validation

```csharp
protected void savebtn_Click(object sender, EventArgs e)
{
    if (exQuntity.Text == "" || exQuntity.Text == null || Convert.ToInt32(exQuntity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية المستبدلة');", true);
        return;
    }
    else if (ex_price.Text == "" || ex_price.Text == null || Convert.ToInt32(ex_price.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال سعر الوحدة');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates exchange quantity is positive and greater than 0
**Price Logic**: Validates exchange price is positive and greater than 0
**Error Prevention**: Prevents exchange with invalid quantity or price

### Exchange Item Validation

```csharp
protected void savebtn_Click(object sender, EventArgs e)
{
    if (cb_exItem.Value == "" || cb_exItem.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف المستبدل');", true);
        return;
    }
    else if (Expirationdate.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال تاريخ الصلاحية');", true);
        return;
    }
    else if (purchase_unit.Value == "" || purchase_unit.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار وحدة الشراء');", true);
        return;
    }
    else if (quntity.Text == "" || quntity.Text == null || Convert.ToInt32(quntity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (priceUnit.Text == "" || priceUnit.Text == null || Convert.ToInt32(priceUnit.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال سعر الوحدة');", true);
        return;
    }
    // ... additional validation
}
```

**Exchange Item Logic**: Validates exchange item selection before addition
**Expiration Logic**: Validates expiration date is selected
**Unit Logic**: Validates purchase unit is selected
**Quantity Logic**: Validates exchange quantity is positive
**Price Logic**: Validates exchange price is positive
**Error Prevention**: Prevents addition without complete exchange item details

### Request Creation Validation

```csharp
protected void create_Click(object sender, EventArgs e)
{
    if (exchangeGridView.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before creating request
**Empty Logic**: Prevents creating empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Committee Selection Validation**: Must select committee before loading items
- **Item Selection Validation**: Must select item before loading batches
- **Batch Selection Validation**: Must select batch before entering exchange details
- **Exchange Quantity Validation**: Must enter positive quantity
- **Exchange Price Validation**: Must enter positive price
- **Exchange Item Validation**: Must select exchange item before adding
- **Expiration Date Validation**: Must select expiration date
- **Purchase Unit Validation**: Must select purchase unit
- **Exchange Item Quantity Validation**: Must enter positive quantity
- **Exchange Item Price Validation**: Must enter positive price

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Committee Configuration Validation**: Ensures committee is properly configured
- **Item Availability Validation**: Ensures items have available stock
- **Batch Availability Validation**: Ensures batches have sufficient stock
- **Exchange Item Validation**: Ensures exchange items are committee-approved
- **Quantity Validation**: Ensures quantities are within available stock

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Committee Access**: Ensures user has access to committee operations
- **Item Access**: Ensures user can access and modify selected items

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
- **Request Creation Success**: "تم انشاء الطلب" (Request created successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary exchange grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Exchange Management System**
- **Database Tables**:
  - `Inventories_check_header` - Committee configuration for exchange workflow
  - `Inventories_exchangeTemp` - Temporary exchange records before request creation
- **Integration Details**:
  - Committee configuration controlled by exchange type
  - Exchange items filtered by committee item type
  - Temporary records stored before request creation
- **Data Flow**:
  - Committees filtered by exchange type and active status
  - Exchange items filtered by committee configuration
  - Temporary records stored for request creation

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch and quantity tracking
  - `Inventories_wharehouse_store` - Warehouse store master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_UOM_item_unit` - Item unit associations
- **Integration Details**:
  - Item information displayed for exchange selection
  - Stock availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Stock information calculated from stock records
  - Unit information calculated from unit associations

#### **Supplier Management System**
- **Database Tables**:
  - `purches_Supplier_record` - Supplier master data
  - `Purchese_PO_Order_Header` - Purchase order header with supplier information
- **Integration Details**:
  - Supplier information displayed for exchange items
  - Supplier associations with purchase orders
- **Data Flow**:
  - Supplier information loaded from supplier master data
  - Supplier associations displayed for reference

### Data Exchange

#### **Committee and Exchange Information**
- **Database Tables**:
  - `Inventories_check_header` - Committee configuration
  - `Inventories_exchangeTemp` - Temporary exchange records
- **Real-time Data**:
  - Committee configuration details
  - Exchange item information
  - Temporary exchange records
- **Data Relationships**:
  - Committees linked to exchange items via item type
  - Exchange items stored in temporary table
  - Temporary records cleared after request creation

#### **Item and Stock Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch and quantity tracking
- **Real-time Data**:
  - Item details and descriptions
  - Stock availability with batch-level detail
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to stock records
  - Stock availability calculated from stock records
  - Unit information calculated from unit associations

#### **Supplier Information**
- **Database Tables**:
  - `purches_Supplier_record` - Supplier master data
  - `Purchese_PO_Order_Header` - Purchase order header with supplier information
- **Real-time Data**:
  - Supplier names and codes for display
  - Supplier associations with purchase orders
- **Data Relationships**:
  - Supplier code linking in PO headers
  - Supplier name display for reference

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار لجنة الاستبدال" Error**
- **Cause**: Committee not selected before loading items
- **Solution**: Always select committee before loading items
- **Prevention**: Committee selection is required for all exchange operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before loading batches
- **Solution**: Always select item before loading batches
- **Prevention**: Item selection is required for all exchange operations

#### **"الرجاء اختيار الدفعة" Error**
- **Cause**: Batch not selected before entering exchange details
- **Solution**: Always select batch before entering exchange details
- **Prevention**: Batch selection is required for all exchange operations

#### **"الرجاء ادخال الكمية المستبدلة" Error**
- **Cause**: Exchange quantity not entered or zero/negative
- **Solution**: Always enter positive exchange quantity
- **Prevention**: Exchange quantity must be greater than 0

#### **"الرجاء ادخال سعر الوحدة" Error**
- **Cause**: Exchange price not entered or zero/negative
- **Solution**: Always enter positive exchange price
- **Prevention**: Exchange price must be greater than 0

#### **"الرجاء اختيار الصنف المستبدل" Error**
- **Cause**: Exchange item not selected before adding
- **Solution**: Always select exchange item before adding
- **Prevention**: Exchange item selection is required for all exchange operations

#### **"الرجاء ادخال تاريخ الصلاحية" Error**
- **Cause**: Expiration date not selected for exchange item
- **Solution**: Always select expiration date for exchange item
- **Prevention**: Expiration date is required for all exchange items

#### **"الرجاء اختيار وحدة الشراء" Error**
- **Cause**: Purchase unit not selected for exchange item
- **Solution**: Always select purchase unit for exchange item
- **Prevention**: Purchase unit is required for all exchange items

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Exchange item quantity not entered or zero/negative
- **Solution**: Always enter positive exchange item quantity
- **Prevention**: Exchange item quantity must be greater than 0

#### **"الرجاء ادخال سعر الوحدة" Error**
- **Cause**: Exchange item price not entered or zero/negative
- **Solution**: Always enter positive exchange item price
- **Prevention**: Exchange item price must be greater than 0

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before creating
- **Solution**: Add at least one item before creating request
- **Prevention**: Request must have items before creation

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Exchange Request Access**: Access to exchange request operations
- **Committee Access**: Access to committee operations
- **Item Access**: Access to items with proper dispensing rules

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Exchange Request Workflow**: Understanding of exchange request process
- **Committee Configuration**: Knowledge of committee setup and item type restrictions
- **Stock Management**: Familiarity with stock availability and batch tracking
- **Exchange Item Management**: Understanding of exchange item selection and details

## Usage Examples

### Basic Exchange Request Workflow

1. **Page Load**: Verify page loads with default settings
2. **Committee Selection**: Select exchange committee for replacement request
3. **Item Selection**: Select item for exchange from inventory
4. **Batch Selection**: Select batch with available stock
5. **Exchange Details**: Enter exchange quantity and price
6. **Exchange Item Selection**: Select replacement item from committee-approved items
7. **Exchange Item Details**: Enter expiration date, purchase unit, quantity, and price
8. **Item Addition**: Click add button to add item to temporary exchange grid
9. **Repeat Items**: Add additional exchange items as needed
10. **Request Creation**: Click create button to create complete exchange request

### Exchange Item Management Workflow

1. **Item Selection**: Select item for exchange from inventory
2. **Batch Selection**: Select batch with available stock
3. **Exchange Details**: Enter exchange quantity and price
4. **Exchange Item Selection**: Select replacement item from committee-approved items
5. **Exchange Item Details**: Enter all required details for replacement item
6. **Item Addition**: Add item to temporary exchange grid
7. **Item Review**: Review items in temporary exchange grid
8. **Item Editing**: Select item and modify details if needed
9. **Item Deletion**: Remove items from temporary exchange grid
10. **Request Completion**: Create request with all validated items

### Committee-Based Exchange Workflow

1. **Committee Configuration**: Committee configured with item type restrictions
2. **Item Selection**: Select item for exchange from inventory
3. **Exchange Item Selection**: Select replacement item from committee-approved items
4. **Exchange Validation**: Validate exchange item meets committee requirements
5. **Exchange Details**: Enter all required exchange details
6. **Item Addition**: Add item to temporary exchange grid
7. **Request Creation**: Create request with committee-approved items

### Stock Management Workflow

1. **Item Selection**: Select item for exchange from inventory
2. **Batch Selection**: Select batch with available stock
3. **Stock Review**: Review stock availability in grid
4. **Exchange Quantity**: Enter exchange quantity within stock limits
5. **Exchange Price**: Enter exchange price for item
6. **Total Calculation**: Verify total value calculation
7. **Stock Validation**: Ensure exchange quantity within stock limits
8. **Item Addition**: Add item to temporary exchange grid
