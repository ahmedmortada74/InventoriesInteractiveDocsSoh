← Go back to 
[Inventories Module Documentation](/Inventories)

# External_return_request.aspx

## Overview

**File**: `\Inventories\Process\External_return_request.aspx`
**Purpose**: External return request system for returning inventory items to suppliers with purchase order tracking
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, procurement staff, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Department Selection (Required for Request)**
- **Department Dropdown**: Must select valid department for return request
- **Error Prevention**: System validates department is selected before adding items
- **Data Source**: DefinitionDep table with department master data
- **Default Behavior**: User must select department manually
- **Error Message**: Validation prevents item addition without department selection
- **Validation**: All departments are available for selection

#### 2. **Purchase Order Selection (Required for Items)**
- **PO Dropdown**: Must select valid purchase order for item filtering
- **Error Prevention**: System validates PO is selected before loading items
- **Data Source**: Inventories_Stock table linked with purchase orders
- **Default Behavior**: User must select PO manually
- **Error Message**: Validation prevents item loading without PO selection
- **Validation**: Only POs with available stock are available

#### 3. **Item Selection (Required for Return)**
- **Item Grid Selection**: Must select valid item from available stock
- **Error Prevention**: System validates item is selected before adding to return
- **Data Source**: Inventories_Stock table with available return quantities
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents addition without item selection
- **Validation**: Only items with returnable quantities are available

#### 4. **Return Quantity Input (Required for Return)**
- **Quantity Field**: Must enter valid quantity for return
- **Error Prevention**: System validates quantity is greater than 0 and within allowed return limit
- **Data Source**: User input with validation against allow_return field
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents return with zero, negative, or excessive quantity
- **Validation**: Quantity must be positive and not exceed allowed return amount

### Common Error Scenarios and Prevention

#### **Department and PO Errors**
- **Error**: No department selected
- **Prevention**: Always select department before adding items
- **Error**: No purchase order selected
- **Prevention**: Always select PO before loading items
- **Error**: PO has no returnable items
- **Prevention**: Verify PO has items with available return quantities

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item from grid before adding
- **Error**: Item has no returnable quantity
- **Prevention**: Check allow_return field before adding
- **Error**: Item already added to return
- **Prevention**: System prevents duplicate additions

#### **Quantity Errors**
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds allowed return
- **Prevention**: System validates quantity against allow_return field
- **Error**: Invalid quantity format
- **Prevention**: Use numeric values only

#### **Return Management Errors**
- **Error**: No items added to return
- **Prevention**: Add at least one item before saving
- **Error**: Return save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item edit fails
- **Prevention**: Select valid item from temporary grid before editing
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have return request permissions** via employee group assignments
3. **Purchase orders must exist** with returnable inventory items
4. **Items must have available return quantities** in inventory
5. **Return workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Return request permissions must be configured
- Purchase order data must be current
- Item inventory data must be current
- Return workflow must be enabled

### Success Criteria

#### **For Department and PO Selection**
- ✅ Department dropdown populated with all departments
- ✅ PO dropdown populated with available purchase orders
- ✅ Department validation prevents item addition without selection
- ✅ PO validation ensures proper item filtering

#### **For Item Selection**
- ✅ Item grid displays all returnable items for selected PO
- ✅ Item details show complete stock information
- ✅ Return quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Item Addition**
- ✅ Quantity validation ensures positive values and within limits
- ✅ Item addition updates temporary return grid successfully
- ✅ Unit conversion calculations display properly
- ✅ Duplicate prevention works correctly

#### **For Return Management**
- ✅ Return save creates proper return records
- ✅ Item edit updates existing items in temporary grid
- ✅ Item delete removes items from temporary grid
- ✅ Return history displays all active returns for user

#### **For Data Management**
- ✅ Temporary return grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for return requests

### Department and PO Selection Section

```html
<!-- Department and PO Selection -->
<dx:BootstrapLayoutGroup Caption="طلب الارتجاع الخارجى" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="امر التوريد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="PO_type" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" enablemulticolumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource1" ValueField="PO_ID_FK" TextField="Arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="PO_ID_FK" />
                            <dx:BootstrapListBoxField FieldName="Arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم المستند الارتجاع" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="txt_doc_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn2" Width="100%" Text=" بحث " OnClick="search_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn2,'btn2'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Item Selection Grid Section

```html
<!-- Item Selection Grid -->
<dx:BootstrapLayoutGroup showCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource5" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessSelectionChangedOnServer="true" ProcessFocusedRowChangedOnServer="true"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Arabic_name" Caption="اسم المورد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="رقم امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Sup_Code_fk" Caption="كود المورد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="item" Caption="اسم الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="اجمالى سعر" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم مستند الاضافة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="purchases_desc" Caption="وحدة الشراء" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ItemUnit_Purchase_Id" Caption="الخصم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة البيع" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ItemUnit_delivery_id" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ItemUnit_storage_Id" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ItemUnit_Exchange_id" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية الورادة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount_Done" Caption="الرصيد المستخدم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="allow_return" Caption="الرصيد المسموح به" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="كود المخزن" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الباتش" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                        <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup showCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption=" " CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn3" Width="100%" Text=" اضافة " OnClick="add_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Secondary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption=" " CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="delete" runat="server" ClientInstanceName="btn4" Width="100%" Enabled="false" Text=" حذف " OnClick="delete_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn4,'btn4'); }" />
                        <CssClasses Icon="simple-icon-arrow-up" />
                        <SettingsBootstrap RenderOption="Warning" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption=" " CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Edit" runat="server" ClientInstanceName="btn5" Width="100%" Enabled="false" Text=" تعديل " OnClick="Edit_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Dark" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكمية المراد ارجاعها" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Enabled="true" NumberType="Float" MinValue="0" Width="100%" ID="delivery_amount"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Return Grid Section

```html
<!-- Temporary Return Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="BootstrapGridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource2" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="BootstrapGridView1_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessSelectionChangedOnServer="false" ProcessFocusedRowChangedOnServer="false"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                        <SettingsEditForm Visible="False"></SettingsEditForm>
                    </dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Arabic_name" Caption="اسم المورد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="رقم امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Sup_Code_fk" Caption="كود" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item" Caption="اسم الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى سعر" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم مستند الاضافة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="return_doc_id" Caption="رقم مستند الارتجاع" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="purchases_desc" Caption="وحدة الشراء" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="الخصم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة البيع" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية الورادة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الرصيد المستخدم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="quantity_Amount_return" Caption="كمية المراد ارجاعها" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="allow_Amount_return" Caption="الكمية المسموح بارجاعها" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Save Button Section

```html
<!-- Save Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn6" Width="100%" Text=" حفظ " OnClick="save_btn_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn6,'btn6'); }" />
                <CssClasses Icon="simple-icon-cursor" />
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses PO and user parameters for comprehensive data filtering:

**PO Parameters**:
- `@PO_doc` - Purchase order ID for filtering items
- `@PO_ID_FK` - Purchase order ID for return records

**User Context Parameters**:
- `@user_id` - User ID for filtering temporary return records

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **PO Selection**: Filters items based on selected purchase order
3. **Item Selection**: Loads item details and return quantities
4. **Quantity Entry**: Validates return quantity against allowed limits
5. **Item Addition**: Adds items to temporary return grid
6. **Return Management**: Saves, edits, or deletes return items
7. **Return Save**: Creates complete return request

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Disables readonly fields appropriately
4. Sets default return request state

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Executes search with validation and data retrieval

**Process**:
1. Validates PO is selected
2. Sets PO parameter for data source
3. Binds item grid with filtered data
4. Clears all selections after search

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary return grid with validation

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0 and within limits
3. Checks item availability for return
4. Inserts item into temporary return table
5. Refreshes temporary return grid
6. Clears form fields for next addition

### Edit_Click Method

```csharp
protected void Edit_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary return grid

**Process**:
1. Validates item selection from temporary grid
2. Validates all required fields are filled
3. Updates item in temporary return table
4. Refreshes temporary return grid
5. Clears form fields after edit

### delete_Click Method

```csharp
protected void delete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary return grid

**Process**:
1. Validates item selection from temporary grid
2. Deletes item from temporary return table
3. Refreshes temporary return grid
4. Clears form fields after deletion

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete return request

**Process**:
1. Validates at least one item is added
2. Generates new return document number
3. Inserts return header record
4. Inserts all temporary items as details
5. Updates stock records with return quantities
6. Clears temporary tables
7. Refreshes all grids and controls
8. Provides success feedback

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for selection
- **Filtering**: All departments available

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

#### **Purchese_PO_Order_Header**
- **Purpose**: Purchase order header with supplier information
- **Key Fields**: ID, Sup_Code_fk
- **Usage**: Provides PO list for item filtering
- **Filtering**: Only POs with available stock

#### **Inventories_Stock**
- **Purpose**: Stock records with batch and quantity tracking
- **Key Fields**: ID, PO_ID_FK, Itemcode, Amount, Amount_Done, allow_return, Expiration_date, storeid, batch_no, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Price_unit, Grand_Total, doc_id, inv_num
- **Usage**: Tracks stock availability for return operations
- **Filtering**: Only items with returnable quantities

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name
- **Usage**: Provides item information for display

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name
- **Usage**: Provides supplier information for display

#### **Inventories_return_to_suppliers_temp**
- **Purpose**: Temporary return records before save
- **Key Fields**: ID, PO_ID_FK, Itemcode, Price_unit, Total_Price, return_doc_id, Store_id, inv_num, Purchase_Id_unit, delivery_id_unit, Amount, Done_Amount, quantity_Amount_return, Expiration_date, doc_id, allow_Amount_return, temp_user
- **Usage**: Tracks return items before request save

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing return operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for return operations

#### **PO Filtering**
```sql
select distinct PO_ID_FK, Arabic_name 
from Inventories_Stock 
inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.ID=Inventories_Stock.PO_ID_FK
inner join purches_Supplier_record on Supplier_code=Sup_Code_fk
```

**Filtering Logic**: Shows only POs with available stock
**Permission Logic**: All POs with stock are available
**Validation**: Ensures PO has returnable items

## Client-Side JavaScript

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

### Checkbox Selection Logic

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

**Selection Logic**: Ensures only one checkbox can be selected at a time
**Grid Logic**: Works within grid context to manage row selection
**Usage**: Applied to grid checkboxes for single selection behavior

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

### Popup and Callback Handling

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

**Popup Logic**: Shows popup at clicked element with callback functionality
**Data Loading**: Loads detailed data via callback when popup is shown
**User Experience**: Provides seamless detail viewing without page refresh

### Browser Security

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Security Logic**: Prevents browser back button navigation
**Session Management**: Ensures proper session handling
**User Experience**: Maintains application state and security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Department and PO Selection Section**
```html
<!-- Department and PO Selection -->
<dx:BootstrapLayoutGroup Caption="طلب الارتجاع الخارجى" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="امر التوريد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند الارتجاع" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Item Selection Grid Section**
```html
<!-- Item Selection Grid -->
<dx:BootstrapLayoutGroup showCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGridViewTemp" runat="server" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
```

#### **3. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup showCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption=" " CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption=" " CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption=" " CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الكمية المراد ارجاعها" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Temporary Return Grid Section**
```html
<!-- Temporary Return Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="BootstrapGridView1" runat="server" OnSelectionChanged="BootstrapGridView1_SelectionChanged">
```

#### **5. Save Button Section**
```html
<!-- Save Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="save_btn" runat="server" OnClick="save_btn_Click">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Department Data Source
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID,Dep_Name FROM DefinitionDep";

// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";

// PO Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select distinct PO_ID_FK, Arabic_name from Inventories_Stock inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.ID=Inventories_Stock.PO_ID_FK inner join purches_Supplier_record on Supplier_code=Sup_Code_fk";

// Item Data Source
SqlDataSource SqlDataSource5 = new SqlDataSource();
SqlDataSource5.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource5.SelectCommand = "select distinct Inventories_Stock.ID, Inventories_Stock.PO_ID_FK, Inventories_Stock.Itemcode, purches_Supplier_record.Arabic_name, Purchese_PO_Order_Header.Sup_Code_fk, Inventories_Item_Settings.arabic_name as item, Inventories_Stock.Price_unit, Inventories_Stock.Grand_Total, Inventories_Stock.doc_id, Inventories_Stock.storeid, Inventories_Stock.inv_num, purchases_unit.description as purchases_desc, Inventories_Stock.ItemUnit_Purchase_Id, delivery_unit.description, Inventories_Stock.ItemUnit_delivery_id, Inventories_Stock.ItemUnit_storage_Id, Inventories_Stock.ItemUnit_Exchange_id, Inventories_Stock.Amount, Inventories_Stock.Amount_Done, (select remain_storage from View_balance_with_storage where ID=Inventories_Stock.ID) as allow_return, Inventories_Stock.Expiration_date, batch_no from Inventories_Stock inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.ID=Inventories_Stock.PO_ID_FK inner join purches_Supplier_record on Supplier_code=Sup_Code_fk inner join Purchese_PO_Order_Details on Purchese_PO_Order_Details.PO_ID_FK=Purchese_PO_Order_Header.ID and Purchese_PO_Order_Details.itemcode=Inventories_Stock.Itemcode inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Stock.Itemcode inner join Inventories_UOM purchases_unit on purchases_unit.id=Inventories_Stock.ItemUnit_Purchase_Id inner join Inventories_UOM delivery_unit on delivery_unit.id=Inventories_Stock.ItemUnit_delivery_id where Inventories_Stock.PO_ID_FK=@PO_doc and MoveType in (1,9,6)";

// Temporary Return Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select distinct Inventories_return_to_suppliers_temp.ID, Inventories_return_to_suppliers_temp.PO_ID_FK, purches_Supplier_record.Arabic_name, Purchese_PO_Order_Header.Sup_Code_fk, Inventories_Item_Settings.arabic_name as item, Inventories_return_to_suppliers_temp.Price_unit, Inventories_return_to_suppliers_temp.Total_Price, Inventories_return_to_suppliers_temp.return_doc_id, Inventories_return_to_suppliers_temp.Store_id, Inventories_return_to_suppliers_temp.inv_num, purchases_unit.description as purchases_desc, Inventories_return_to_suppliers_temp.Purchase_Id_unit, delivery_unit.description, Inventories_return_to_suppliers_temp.delivery_id_unit, Inventories_return_to_suppliers_temp.Amount, Inventories_return_to_suppliers_temp.Done_Amount, quantity_Amount_return, Inventories_return_to_suppliers_temp.Expiration_date, doc_id, allow_Amount_return from Inventories_return_to_suppliers_temp inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.ID=Inventories_return_to_suppliers_temp.PO_ID_FK inner join purches_Supplier_record on Supplier_code=Sup_Code_fk inner join Purchese_PO_Order_Details on Purchese_PO_Order_Details.PO_ID_FK=Purchese_PO_Order_Header.ID and Purchese_PO_Order_Details.itemcode=Inventories_return_to_suppliers_temp.Itemcode inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_return_to_suppliers_temp.Itemcode inner join Inventories_UOM purchases_unit on purchases_unit.id=Inventories_return_to_suppliers_temp.Purchase_Id_unit inner join Inventories_UOM delivery_unit on delivery_unit.id=Inventories_return_to_suppliers_temp.delivery_id_unit where Inventories_return_to_suppliers_temp.PO_ID_FK=@PO_doc and temp_user=@user_id";
```

## Business Logic and Validation

### Department and PO Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (Dep.Value == "" || Dep.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الادارة');", true);
        return;
    }
    else if (PO_type.Value == "" || PO_type.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار امر التوريد');", true);
        return;
    }
    // ... additional validation
}
```

**Department Logic**: Validates department selection before item addition
**PO Logic**: Validates PO selection before item addition
**Error Prevention**: Prevents item addition without proper department and PO context

### Item Selection Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection from grid before addition
**Selection Logic**: Ensures item is selected from available stock
**Error Prevention**: Prevents addition without proper item selection

### Quantity Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (delivery_amount.Text == "" || delivery_amount.Text == null || Convert.ToDouble(delivery_amount.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية المراد ارجاعها');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and greater than 0
**Error Prevention**: Prevents return with invalid quantity

### Return Limit Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (Convert.ToDouble(delivery_amount.Text) > Convert.ToDouble(allow_return.Text))
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الكمية المراد ارجاعها اكبر من الكمية المسموح بها');", true);
        return;
    }
    // ... additional validation
}
```

**Limit Logic**: Validates quantity does not exceed allowed return amount
**Error Prevention**: Prevents return exceeding inventory limits

### Request Save Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (BootstrapGridView1.VisibleRowCount == 0)
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
- **Department Selection Validation**: Must select department before adding items
- **PO Selection Validation**: Must select PO before loading items
- **Item Selection Validation**: Must select item from grid before adding
- **Quantity Validation**: Must enter positive quantity within limits

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Department Access Validation**: Ensures user has access to department data
- **PO Validation**: Ensures PO has returnable items
- **Item Availability Validation**: Ensures items have returnable quantities
- **Quantity Validation**: Ensures quantities are within allowed limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to department data
- **Return Access**: Ensures user can access and modify return requests

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
- **Return Save Success**: "تم حفظ طلب الارتجاع" (Return request saved successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary return grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Return Management System**
- **Database Tables**:
  - `Inventories_return_to_suppliers_temp` - Temporary return records before save
  - `Inventories_Stock` - Stock records with return quantities
- **Integration Details**:
  - Return workflow controlled by PO and item selection
  - Return quantities tracked against allowed limits
  - Temporary records stored before return save
- **Data Flow**:
  - Items filtered by PO and available return quantities
  - Return quantities validated against allowed limits
  - Temporary records stored for return save

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all return operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with batch and quantity tracking
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier master data
- **Integration Details**:
  - Item information displayed for return selection
  - Stock availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Stock information calculated from stock records
  - Unit information calculated from unit associations

### Data Exchange

#### **PO and Return Information**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - Purchase order header
  - `Inventories_return_to_suppliers_temp` - Temporary return records
- **Real-time Data**:
  - PO information for item filtering
  - Return item information
  - Temporary return records
- **Data Relationships**:
  - POs linked to items via stock records
  - Return items stored in temporary table
  - Temporary records cleared after return save

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

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار الادارة" Error**
- **Cause**: Department not selected before adding items
- **Solution**: Always select department before adding items
- **Prevention**: Department selection is required for all return operations

#### **"الرجاء اختيار امر التوريد" Error**
- **Cause**: PO not selected before loading items
- **Solution**: Always select PO before loading items
- **Prevention**: PO selection is required for all return operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from grid before adding
- **Solution**: Always select item from grid before adding
- **Prevention**: Item selection is required for all return operations

#### **"الرجاء ادخال الكمية المراد ارجاعها" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Always enter positive quantity
- **Prevention**: Quantity must be greater than 0

#### **"الكمية المراد ارجاعها اكبر من الكمية المسموح بها" Error**
- **Cause**: Quantity exceeds allowed return amount
- **Solution**: Enter quantity within allowed return limit
- **Prevention**: System validates quantity against allow_return field

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to return before saving
- **Solution**: Add at least one item before saving
- **Prevention**: Return must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Return Request Access**: Access to return request operations
- **Department Access**: Access to department data
- **PO Access**: Access to purchase order data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Return Request Workflow**: Understanding of return request process
- **PO Management**: Knowledge of purchase order selection and item filtering
- **Quantity Management**: Familiarity with return quantity limits and validation
- **Return Management**: Understanding of return save, edit, and delete operations

## Usage Examples

### Basic Return Request Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **PO Selection**: Select purchase order with returnable items
3. **Item Selection**: Select item from available stock grid
4. **Quantity Entry**: Enter return quantity within allowed limits
5. **Item Addition**: Click add button to add item to temporary return grid
6. **Repeat Items**: Add additional return items as needed
7. **Return Save**: Click save button to create complete return request

### Return Item Management Workflow

1. **PO Selection**: Select purchase order with returnable items
2. **Item Selection**: Select item from available stock grid
3. **Quantity Entry**: Enter return quantity within allowed limits
4. **Item Addition**: Add item to temporary return grid
5. **Item Review**: Review items in temporary return grid
6. **Item Editing**: Select item and modify quantity if needed
7. **Item Deletion**: Remove items from temporary return grid
8. **Return Completion**: Save return with all validated items

### Multi-Item Return Management

1. **PO Selection**: Select purchase order with multiple returnable items
2. **Item Review**: Review all items in available stock grid
3. **Selective Addition**: Add specific items as needed
4. **Quantity Management**: Manage return quantities for each item
5. **Return Validation**: Ensure all items have proper validation
6. **Return Save**: Save return with all validated items
