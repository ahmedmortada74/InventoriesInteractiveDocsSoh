← Go back to 
[Inventories Module Documentation](/Inventories)


# Request_for_reuse.aspx

## Overview

**File**: `\module\Inventories\Process\Request_for_reuse.aspx`
**Purpose**: Reuse request system for inventory items with quantity and batch management
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, warehouse managers, reuse personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Item Filtering)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only active stores are available

#### 2. **Item Selection (Required for Reuse Request)**
- **Item Dropdown**: Must select valid item for reuse request
- **Error Prevention**: System validates item is selected before loading details
- **Data Source**: Inventories_Stock table with item information
- **Default Behavior**: User must select item manually
- **Error Message**: Validation prevents details loading without item selection
- **Validation**: Only items with available quantity are available

#### 3. **Reuse Quantity Input (Required for Reuse Request)**
- **Reuse Quantity Field**: Must enter valid reuse quantity for each item
- **Error Prevention**: System validates reuse quantity is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter reuse quantity manually
- **Error Message**: Validation prevents request with zero or negative reuse quantity
- **Validation**: Reuse quantity must be positive number

#### 4. **Reuse Count Input (Required for Reuse Request)**
- **Reuse Count Field**: Must enter valid reuse count for each item
- **Error Prevention**: System validates reuse count is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter reuse count manually
- **Error Message**: Validation prevents request with zero or negative reuse count
- **Validation**: Reuse count must be positive number

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: Store has no items
- **Prevention**: Verify store has items before selection

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before loading details
- **Error**: Item has no available quantity
- **Prevention**: Verify item has available quantity before selection

#### **Reuse Quantity Errors**
- **Error**: No reuse quantity entered
- **Prevention**: Always enter reuse quantity before request
- **Error**: Zero or negative reuse quantity
- **Prevention**: Always enter positive reuse quantity values

#### **Reuse Count Errors**
- **Error**: No reuse count entered
- **Prevention**: Always enter reuse count before request
- **Error**: Zero or negative reuse count
- **Prevention**: Always enter positive reuse count values

#### **Request Management Errors**
- **Error**: Request fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have reuse request permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Items must be available** for reuse
5. **Reuse workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Reuse request permissions must be configured
- Store data must be current
- Item data must be available
- Reuse workflow must be enabled

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper item loading
- ✅ Store selection enables item filtering

#### **For Item Selection**
- ✅ Item dropdown populated with items having available quantity
- ✅ Item validation ensures proper details loading
- ✅ Item selection enables batch filtering

#### **For Reuse Quantity Input**
- ✅ Reuse quantity field accepts valid numeric input
- ✅ Reuse quantity validation ensures proper request
- ✅ Reuse quantity values are positive and reasonable

#### **For Reuse Count Input**
- ✅ Reuse count field accepts valid numeric input
- ✅ Reuse count validation ensures proper request
- ✅ Reuse count values are positive and reasonable

#### **For Request Management**
- ✅ Request save creates proper request records
- ✅ Item delete removes items from temporary grid
- ✅ Request workflow works with proper validation
- ✅ Request completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for reuse request

### Document and User Information Section

```html
<!-- Document and User Information -->
<dx:BootstrapLayoutGroup Caption="شاشة طلب اعادة الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="txt_doc_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
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
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_id" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="StoresPerDS" ValueField="code" TextField="english_name" OnSelectedIndexChanged="inv_id_SelectedIndexChanged">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="5">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="item_comp_box" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="item_code_data_source" TextFormatString=" {1} - {0} - {2} -{3} " ValueField="ID" TextField="Itemcode" OnSelectedIndexChanged="item_comp_box_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="batch_no" />
                            <dx:BootstrapListBoxField FieldName="Itemcode" />
                            <dx:BootstrapListBoxField FieldName="available_quantity" />
                            <dx:BootstrapListBoxField FieldName="english_name" />
                            <dx:BootstrapListBoxField FieldName="ID" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text="بحث" OnClick="search_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="batch_no_txt"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الرصيد المصروف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="Available_balance_txt"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="usage_unit_txt"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="عدد وحدة اعادة الاستخدام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Enabled="false" MinValue="1" Number="1" MaxValue="1" Width="100%" ID="Bootstrap_Spin_Edit_unit"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="عدد مرات اعادة الاستخدام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Enabled="false" Number="1" MinValue="1" MaxValue="1000" Width="100%" ID="BootstrapSpinEdit_no_of_reuse"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="اضافة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="add_temp" runat="server" ClientInstanceName="btn7" Width="100%" Text="اضافة" OnClick="add_temp_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn7,'btn7'); }" />
                        <CssClasses Icon="simple-icon-magnifier-add" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="حذف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="delete_temp" runat="server" ClientInstanceName="btn8" Width="100%" Text="حذف" OnClick="delete_temp_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn8,'btn8'); }" />
                        <CssClasses Icon="simple-icon-pencil" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="تعديل" CaptionSettings-HorizontalAlign="Right" Visible="false" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Edit_temp" runat="server" ClientInstanceName="btn6" Width="100%" Text="تعديل" Visible="false" OnClick="Edit_temp_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn6,'btn6'); }" />
                        <CssClasses Icon="simple-icon-note" />
                        <SettingsBootstrap RenderOption="Secondary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Request Grid Section

```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutGroup Caption="طلب اعادة الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="Bootstrap_temp_reuse" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="id" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource1" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="id" Caption="ID" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="StockDate" Caption="التاريخ" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="المخزن" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="الكود الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Purchase" Caption="الكمية بوحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_delivery" Caption="الكمية بوحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_storage" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Exchange" Caption="الكمية بوحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحيه" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_purchase" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_delivery" Caption="وحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_storage" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_exchange" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reused_number" Caption="عدد مرات اعادة الاستخدام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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

### Save Button Section

```html
<!-- Save Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="Save_BTN" runat="server" ClientInstanceName="btn10" Width="100%" Text="حفظ" OnClick="Save_BTN_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn10,'btn10'); }" />
                <CssClasses Icon="simple-icon-magnifier-add" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Saved Requests Grid Section

```html
<!-- Saved Requests Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="BootstrapGridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="id" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource2" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="id" Caption="ID" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="StockDate" Caption="التاريخ" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="المخزن" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="الكود الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Purchase" Caption="الكمية بوحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_delivery" Caption="الكمية بوحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_storage" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Exchange" Caption="الكمية بوحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحيه" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_purchase" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_delivery" Caption="وحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_storage" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_exchange" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reused_number" Caption="عدد مرات اعادة الاستخدام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="doc_id_saving" Caption="رقم المستند" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@user_id` - User ID for filtering temporary records

**Store Parameters**:
- `@code` - Store ID for filtering items

**Item Parameters**:
- `@item_code` - Item code for filtering batches

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads items based on selected store
3. **Item Selection**: Loads batch information based on selected item
4. **Reuse Quantity Entry**: Enters reuse quantity for each item
5. **Reuse Count Entry**: Enters reuse count for each item
6. **Item Addition**: Adds item to temporary request grid
7. **Request Save**: Saves complete reuse request
8. **Request History**: Loads previous reuse requests for user

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default reuse request state
4. Initializes date displays

### inv_id_SelectedIndexChanged Method

```csharp
protected void inv_id_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for item data source
3. Binds item dropdown
4. Updates store information display

### item_comp_box_SelectedIndexChanged Method

```csharp
protected void item_comp_box_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information based on selected item

**Process**:
1. Validates item selection
2. Loads batch number from item
3. Loads available quantity from item
4. Updates item information display

### add_temp_Click Method

```csharp
protected void add_temp_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary request grid

**Process**:
1. Validates all required fields are filled
2. Validates reuse quantity is greater than 0
3. Validates reuse count is greater than 0
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary request grid
7. Clears form fields for next addition

### Save_BTN_Click Method

```csharp
protected void Save_BTN_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete reuse request

**Process**:
1. Validates at least one item is added
2. Generates new request document number
3. Inserts request header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### delete_temp_Click Method

```csharp
protected void delete_temp_Click(object sender, EventArgs e)
```

**Purpose**: Deletes selected items from temporary request grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary request grid
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, english_name, arabic_name, active, Store_type
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Stock**
- **Purpose**: Stock records with batch information
- **Key Fields**: ID, Itemcode, batch_no, Amount_Done_Exchange, Expiration_date, MoveType, saving_request, Recycling_indecator
- **Usage**: Tracks batch information for reuse
- **Filtering**: Only items with MoveType=3 and saving_request='0' and Recycling_indecator='2'

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, english_name, Recycling_indecator, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items with Recycling_indecator='2'

#### **Inventories_Stock_saving_temp**
- **Purpose**: Temporary saving request records before save
- **Key Fields**: id, StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, Expiration_date, reused_number, user_Temp
- **Usage**: Tracks reuse request items before save

#### **Inventories_Stock_saving_requested**
- **Purpose**: Saving request records
- **Key Fields**: id, StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, Expiration_date, reused_number, doc_id_saving, request_user
- **Usage**: Tracks reuse request items for requests

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing reuse request data

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp and Store_type<>'1'
```

**Filtering Logic**: Shows only stores with active rules
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has reuse items

#### **Item Filtering**
```sql
select Itemcode, batch_no, Amount_Done_Exchange as available_quantity, Inventories_Item_Settings.english_name, Inventories_Stock.ID 
from Inventories_Stock 
inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Stock.Itemcode 
where storeid=@code and MoveType in (3) and saving_request='0' and Inventories_Item_Settings.Recycling_indecator='2'
```

**Filtering Logic**: Shows only items with available quantity and recycling indicator
**Permission Logic**: Only items with recycling capability are available
**Validation**: Ensures item has available quantity

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, item, and batch dropdowns

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
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Document and User Information Section**
```html
<!-- Document and User Information -->
<dx:BootstrapLayoutGroup Caption="شاشة طلب اعادة الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="5">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الرصيد المصروف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="عدد وحدة اعادة الاستخدام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="عدد مرات اعادة الاستخدام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="اضافة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
        <dx:BootstrapLayoutItem Caption="حذف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="تعديل" CaptionSettings-HorizontalAlign="Right" Visible="false" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Temporary Request Grid Section**
```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutGroup Caption="طلب اعادة الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

#### **3. Save Button Section**
```html
<!-- Save Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
```

#### **4. Saved Requests Grid Section**
```html
<!-- Saved Requests Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
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

// Store Data Source
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp and Store_type<>'1'";

// Item Data Source
SqlDataSource item_code_data_source = new SqlDataSource();
item_code_data_source.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
item_code_data_source.SelectCommand = "select Itemcode, batch_no, Amount_Done_Exchange as available_quantity, Inventories_Item_Settings.english_name, Inventories_Stock.ID from Inventories_Stock inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Stock.Itemcode where storeid=@code and MoveType in (3) and saving_request='0' and Inventories_Item_Settings.Recycling_indecator='2'";

// Temporary Request Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select distinct Inventories_Stock_saving_temp.id, format(StockDate,'yyyy-MM-dd') as StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, format(Expiration_date,'yyyy-MM-dd') as Expiration_date, Inventories_UOM.description, uom_delviery.description, uom_storage.description, uom_exchange.description, reused_number from Inventories_Stock_saving_temp inner join Inventories_UOM on Inventories_UOM.id=Inventories_Stock_saving_temp.ItemUnit_Purchase_Id inner join Inventories_UOM uom_delviery on uom_delviery.id=Inventories_Stock_saving_temp.ItemUnit_delivery_id inner join Inventories_UOM uom_storage on uom_storage.id=Inventories_Stock_saving_temp.ItemUnit_storage_Id inner join Inventories_UOM uom_exchange on uom_exchange.id=Inventories_Stock_saving_temp.ItemUnit_Exchange_id where user_Temp=@user_id";

// Saved Requests Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select distinct Inventories_Stock_saving_requested.id, format(StockDate,'yyyy-MM-dd') as StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, format(Expiration_date,'yyyy-MM-dd') as Expiration_date, Inventories_UOM.description, uom_delviery.description, uom_storage.description, uom_exchange.description, reused_number, doc_id_saving from Inventories_Stock_saving_requested inner join Inventories_UOM on Inventories_UOM.id=Inventories_Stock_saving_requested.ItemUnit_Purchase_Id inner join Inventories_UOM uom_delviery on uom_delviery.id=Inventories_Stock_saving_requested.ItemUnit_delivery_id inner join Inventories_UOM uom_storage on uom_storage.id=Inventories_Stock_saving_requested.ItemUnit_storage_Id inner join Inventories_UOM uom_exchange on uom_exchange.id=Inventories_Stock_saving_requested.ItemUnit_Exchange_id where request_user=@user_id";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void inv_id_SelectedIndexChanged(object sender, EventArgs e)
{
    if (inv_id.Value == "" || inv_id.Value == null)
    {
        // Clear item dropdown
        item_comp_box.DataSource = null;
        item_comp_box.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading items
**Error Prevention**: Prevents item loading without store selection

### Item Selection Validation

```csharp
protected void item_comp_box_SelectedIndexChanged(object sender, EventArgs e)
{
    if (item_comp_box.Value == "" || item_comp_box.Value == null)
    {
        // Clear batch information
        batch_no_txt.Text = "";
        Available_balance_txt.Text = "";
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading batch information
**Error Prevention**: Prevents batch loading without item selection

### Reuse Quantity Validation

```csharp
protected void add_temp_Click(object sender, EventArgs e)
{
    if (Convert.ToInt32(Bootstrap_Spin_Edit_unit.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال عدد وحدة اعادة الاستخدام');", true);
        return;
    }
    // ... additional validation
}
```

**Reuse Quantity Logic**: Validates reuse quantity is positive and within limits
**Error Prevention**: Prevents adding with invalid reuse quantity

### Reuse Count Validation

```csharp
protected void add_temp_Click(object sender, EventArgs e)
{
    if (Convert.ToInt32(BootstrapSpinEdit_no_of_reuse.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال عدد مرات اعادة الاستخدام');", true);
        return;
    }
    // ... additional validation
}
```

**Reuse Count Logic**: Validates reuse count is positive and within limits
**Error Prevention**: Prevents adding with invalid reuse count

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading items
- **Item Selection Validation**: Must select item before loading details
- **Reuse Quantity Validation**: Must enter reuse quantity before adding
- **Reuse Count Validation**: Must enter reuse count before adding

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Item Validation**: Ensures item has available quantity
- **Reuse Quantity Validation**: Ensures reuse quantity is positive and within limits
- **Reuse Count Validation**: Ensures reuse count is positive and within limits

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
- **Request Save Success**: "تم حفظ الطلب" (Request saved successfully)
- **Item Delete Success**: "تم حذف الصنف" (Item deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Reuse Request Management System**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Stock` - Stock records with batch information
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock_saving_temp` - Temporary saving request records
  - `Inventories_Stock_saving_requested` - Saving request records
  - `Inventories_UOM` - Unit of measure master data
- **Integration Details**:
  - Store selection controls item filtering
  - Item selection controls batch filtering
  - Reuse quantity and count tracked for each item
  - Request tracked with complete information
- **Data Flow**:
  - Stores filtered for user access
  - Items filtered by store
  - Batches filtered by item
  - Request tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all request operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Store information for filtering
  - Item information for batch filtering
- **Data Relationships**:
  - Stores linked to items via storeid
  - Items linked to batches via Itemcode
  - Request tracked by user

#### **Batch and Request Information**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with batch information
  - `Inventories_Stock_saving_temp` - Temporary saving request records
  - `Inventories_Stock_saving_requested` - Saving request records
- **Real-time Data**:
  - Batch details and expiration dates
  - Reuse quantities and counts
  - Unit information and calculations
- **Data Relationships**:
  - Batches linked to items via Itemcode
  - Request tracked by batch
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all request operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before loading details
- **Solution**: Always select item before loading details
- **Prevention**: Item selection is required for all request operations

#### **"الرجاء ادخال عدد وحدة اعادة الاستخدام" Error**
- **Cause**: Reuse quantity not entered before adding
- **Solution**: Always enter reuse quantity before adding
- **Prevention**: Reuse quantity entry is required for all request operations

#### **"الرجاء ادخال عدد مرات اعادة الاستخدام" Error**
- **Cause**: Reuse count not entered before adding
- **Solution**: Always enter reuse count before adding
- **Prevention**: Reuse count entry is required for all request operations

#### **No Items Found**
- **Cause**: Store has no items
- **Solution**: Verify store has items before selection
- **Prevention**: Ensure stores have items

#### **Request Save Failed Error**
- **Cause**: Request cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

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
- **Request Access**: Access to request operations
- **Store Access**: Access to stores with items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Request Workflow**: Understanding of request process
- **Store Management**: Knowledge of store selection and filtering
- **Item Management**: Knowledge of item selection and batch filtering
- **Request Management**: Familiarity with request save and delete operations

## Usage Examples

### Basic Request Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for item filtering
3. **Item Selection**: Select item for reuse request
4. **Batch Review**: Review batch information for selected item
5. **Reuse Quantity Entry**: Enter reuse quantity for each item
6. **Reuse Count Entry**: Enter reuse count for each item
7. **Item Addition**: Add item to temporary request grid
8. **Repeat Items**: Add additional request items as needed
9. **Request Save**: Save complete reuse request

### Request Management Workflow

1. **Store Selection**: Select store for item filtering
2. **Item Selection**: Select item for reuse request
3. **Batch Review**: Review batch information for selected item
4. **Reuse Quantity Entry**: Enter reuse quantity for each item
5. **Reuse Count Entry**: Enter reuse count for each item
6. **Item Addition**: Add item to temporary request grid
7. **Item Review**: Review items in temporary request grid
8. **Item Delete**: Remove items from temporary request grid
9. **Request Completion**: Save request with all validated items

### Multi-Item Request Management

1. **Store Selection**: Select store for item filtering
2. **Multiple Item Selection**: Select multiple items for reuse request
3. **Batch Review**: Review batch information for all items
4. **Reuse Quantity Entry**: Enter reuse quantity for each item
5. **Reuse Count Entry**: Enter reuse count for each item
6. **Item Addition**: Add all items to temporary request grid
7. **Request Save**: Save complete request with all items
8. **Request Verification**: Verify request is saved correctly