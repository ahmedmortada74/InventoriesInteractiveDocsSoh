← Go back to 
[Inventories Module Documentation](/Inventories)


# PharmSavingRquest.aspx

## Overview

**File**: `\Inventories\Process\PharmSavingRquest.aspx`
**Purpose**: Pharmaceutical saving request system for usage optimization and cost reduction
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacy administrators, inventory managers, procurement personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Item Filtering)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only active stores with pharmacy dispense indicator are available

#### 2. **Item Selection (Required for Usage Analysis)**
- **Item Dropdown**: Must select valid item for usage analysis
- **Error Prevention**: System validates item is selected before loading usage data
- **Data Source**: Inventories_Stock table with item information
- **Default Behavior**: User must select item manually
- **Error Message**: Validation prevents usage data loading without item selection
- **Validation**: Only items with MoveType=3 (dispense) are available

#### 3. **Exchange Days Input (Required for Usage Calculation)**
- **Exchange Days Field**: Must enter valid exchange days for usage calculation
- **Error Prevention**: System validates exchange days is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter exchange days manually
- **Error Message**: Validation prevents search with zero or negative exchange days
- **Validation**: Exchange days must be positive number

#### 4. **Saved Quantity Input (Required for Saving Request)**
- **Saved Quantity Field**: Must enter valid saved quantity for each item
- **Error Prevention**: System validates saved quantity is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter saved quantity manually for each item
- **Error Message**: Validation prevents adding with zero or negative saved quantity
- **Validation**: Saved quantity must be positive number

#### 5. **Expiration Date Selection (Required for Saving Request)**
- **Expiration Date Dropdown**: Must select valid expiration date for each item
- **Error Prevention**: System validates expiration date is selected before adding
- **Data Source**: Inventories_Stock table with expiration date information
- **Default Behavior**: User must select expiration date manually
- **Error Message**: Validation prevents adding without expiration date selection
- **Validation**: Only valid expiration dates are available

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: Store has no pharmacy dispense indicator
- **Prevention**: Verify store has pharmacy dispense capability

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before loading usage data
- **Error**: Item has no usage data
- **Prevention**: Verify item has dispense history

#### **Exchange Days Errors**
- **Error**: No exchange days entered
- **Prevention**: Always enter exchange days before search
- **Error**: Zero or negative exchange days
- **Prevention**: Always enter positive exchange days values

#### **Saved Quantity Errors**
- **Error**: No saved quantity entered
- **Prevention**: Always enter saved quantity before adding
- **Error**: Zero or negative saved quantity
- **Prevention**: Always enter positive saved quantity values

#### **Expiration Date Errors**
- **Error**: No expiration date selected
- **Prevention**: Always select expiration date before adding
- **Error**: Invalid expiration date
- **Prevention**: Verify expiration date is valid and available

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Item delete fails
- **Prevention**: Select valid item from temporary grid before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have pharmacy saving permissions** via employee group assignments
3. **Stores must be configured** with pharmacy dispense indicator
4. **Items must be available** with dispense history
5. **Usage data must be available** for analysis

#### **Required System State**
- User authentication must be active
- Pharmacy saving permissions must be configured
- Store data must be current with pharmacy dispense capability
- Item data must be current with dispense history
- Usage data must be available for analysis

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores with pharmacy dispense indicator
- ✅ Store validation ensures proper item loading
- ✅ Store selection enables item filtering

#### **For Item Selection**
- ✅ Item dropdown populated with items having dispense history
- ✅ Item validation ensures proper usage data loading
- ✅ Item selection enables usage analysis

#### **For Exchange Days Input**
- ✅ Exchange days field accepts valid numeric input
- ✅ Exchange days validation ensures proper usage calculation
- ✅ Exchange days values are positive and reasonable

#### **For Saved Quantity Input**
- ✅ Saved quantity field accepts valid numeric input
- ✅ Saved quantity validation ensures proper saving request
- ✅ Saved quantity values are positive and reasonable

#### **For Expiration Date Selection**
- ✅ Expiration date dropdown populated with valid dates only
- ✅ Expiration date validation ensures proper saving request
- ✅ Expiration date selection enables item addition

#### **For Request Management**
- ✅ Request save creates proper saving request records
- ✅ Item delete removes items from temporary grid
- ✅ Request workflow works with proper validation
- ✅ Request completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for pharmaceutical saving request

### Document and User Information Section

```html
<!-- Document and User Information -->
<dx:BootstrapLayoutGroup Caption="شاشة توفير الأستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="txt_doc_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المستخدم" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
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
                    <dx:BootstrapComboBox ID="inv_id" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="StoresPerDS" ValueField="code" TextField="arabic_name" OnSelectedIndexChanged="inv_id_SelectedIndexChanged">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="item_comp_box" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="item_code_data_source" TextFormatString=" {1} : {0} " ValueField="Itemcode" TextField="Itemcode" OnSelectedIndexChanged="item_comp_box_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Itemcode" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="دورة المنصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Number="1" MinValue="1" MaxValue="1000" Width="100%" ID="exchangeDays"></dx:BootstrapSpinEdit>
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
    </Items>
</dx:BootstrapLayoutGroup>
```

### Usage Data Grid Section

```html
<!-- Usage Data Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="Data" ClientInstanceName="gridre" AutoGenerateColumns="true" KeyFieldName="id" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="DSData" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewDataColumn FieldName="StockDate" Caption="التاريخ"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Amount_Done_Exchange" Caption="عدد الوحدة المنصرف"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="description" Caption="الوحدة"></dx:BootstrapGridViewDataColumn>
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

### Saving Request Input Section

```html
<!-- Saving Request Input -->
<dx:BootstrapLayoutItem Caption="الكميه الموفرة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" MinValue="1" Number="1" MaxValue="999" Width="100%" ID="NewQuntity"></dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الصلاحيه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="expireDate" DataSourceID="expireDateDS" TextField="Expiration_date" ValueField="Expiration_date"></dx:BootstrapComboBox>
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
```

### Action Buttons Section

```html
<!-- Action Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
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
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
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
```

### Temporary Request Grid Section

```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutGroup Caption="طلب توفير الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
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
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Purchase" Caption="الكمية بوحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_delivery" Caption="الكمية بوحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_storage" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Exchange" Caption="الكمية بوحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحيه" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_purchase" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_delivery" Caption="وحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_storage" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_exchange" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reused_number" Caption="الكميه الموفرة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit_usage" Caption="سعر الوحدة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="TotalPrice" Caption="اجمالى قيمة التوفير" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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

### Save Request Button Section

```html
<!-- Save Request Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="Save_BTN" runat="server" ClientInstanceName="btn10" Width="100%" Text="حفظ طلب الأضافة" OnClick="Save_BTN_Click">
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
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Purchase" Caption="الكمية بوحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_delivery" Caption="الكمية بوحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_storage" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Exchange" Caption="الكمية بوحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحيه" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_purchase" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_delivery" Caption="وحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_storage" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_exchange" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reused_number" Caption="الكميه الموفرة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit_usage" Caption="سعر الوحدة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="TotalPrice" Caption="اجمالى قيمة التوفير" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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
- `@inv_id` - Store ID for filtering items

**Item Parameters**:
- `@item_comp_box` - Item code for filtering usage data

**Date Parameters**:
- `@date` - Start date for filtering usage data
- `@date2` - End date for filtering usage data

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads items based on selected store
3. **Item Selection**: Loads usage data based on selected item
4. **Exchange Days Entry**: Calculates usage period
5. **Usage Data Display**: Displays usage history for selected item
6. **Saved Quantity Entry**: Enters saved quantity for each item
7. **Expiration Date Selection**: Selects expiration date for each item
8. **Item Addition**: Adds item to temporary request grid
9. **Request Save**: Saves complete saving request
10. **Request History**: Loads previous saving requests for user

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default saving request state
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

**Purpose**: Loads usage data based on selected item

**Process**:
1. Validates item selection
2. Sets parameters for usage data source
3. Binds usage data grid
4. Updates item information display

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Searches for usage data based on selected filters

**Process**:
1. Validates store selection
2. Validates item selection
3. Validates exchange days
4. Executes search query
5. Displays results in grid
6. Updates usage information

### add_temp_Click Method

```csharp
protected void add_temp_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary saving request grid

**Process**:
1. Validates all required fields are filled
2. Validates saved quantity is greater than 0
3. Validates expiration date is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary request grid
7. Clears form fields for next addition

### Save_BTN_Click Method

```csharp
protected void Save_BTN_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete saving request

**Process**:
1. Validates at least one item is added
2. Generates new saving request document number
3. Inserts saving request header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### delete_temp_Click Method

```csharp
protected void delete_temp_Click(object sender, EventArgs e)
```

**Purpose**: Deletes selected items from temporary saving request grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary request grid
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active, Store_type, pharm_dispense_indicator
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores with pharm_dispense_indicator = 1

#### **Inventories_Stock**
- **Purpose**: Stock records with dispensed items
- **Key Fields**: ID, StockDate, MoveType, Itemcode, storeid, Amount_Done_Exchange, Expiration_date, ItemUnit_Exchange_id
- **Usage**: Tracks dispensed items for usage analysis
- **Filtering**: Only items with MoveType = 3 (dispense)

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_Item_Settings_drug_sheet**
- **Purpose**: Drug sheet information with concentration
- **Key Fields**: Item_Settings_fk, concentration, concentration_unit
- **Usage**: Provides drug concentration information
- **Filtering**: Only items with drug sheet information

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Inventories_Stock_saving_temp**
- **Purpose**: Temporary saving request records before save
- **Key Fields**: id, StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, Expiration_date, reused_number, Price_unit_usage, user_Temp
- **Usage**: Tracks saving request items before request save

#### **Inventories_Stock_saving_requested**
- **Purpose**: Saving request records
- **Key Fields**: id, StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, Expiration_date, reused_number, Price_unit_usage, doc_id_saving, request_user
- **Usage**: Tracks saving request items for requests

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
**Validation**: Ensures user is authenticated before accessing saving request data

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp and Store_type<>'1' and pharm_dispense_indicator = 1
```

**Filtering Logic**: Shows only stores with active rules and pharmacy dispense indicator
**Permission Logic**: Only stores with pharmacy dispense capability are available
**Validation**: Ensures store has pharmacy dispense capability

#### **Item Filtering**
```sql
select distinct Itemcode, CONCAT(Inventories_Item_Settings.arabic_name, ' - ' , concentration , ' - ' , description) as arabic_name 
from Inventories_Stock 
inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Stock.Itemcode 
inner join Inventories_Item_Settings_drug_sheet I on I.Item_Settings_fk = Inventories_Item_Settings.id 
left join Inventories_UOM on Inventories_UOM.id = I.concentration_unit 
where storeid=@code and MoveType in (3)
```

**Filtering Logic**: Shows only items with dispense history (MoveType=3)
**Permission Logic**: Only items with dispense history are available
**Validation**: Ensures item has dispense history

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, item, and expiration date dropdowns

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
<dx:BootstrapLayoutGroup Caption="شاشة توفير الأستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="المستخدم" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الصنف" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="دورة المنصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Usage Data Grid Section**
```html
<!-- Usage Data Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **3. Saving Request Input Section**
```html
<!-- Saving Request Input -->
<dx:BootstrapLayoutItem Caption="الكميه الموفرة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الصلاحيه" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
```

#### **4. Action Buttons Section**
```html
<!-- Action Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
```

#### **5. Temporary Request Grid Section**
```html
<!-- Temporary Request Grid -->
<dx:BootstrapLayoutGroup Caption="طلب توفير الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
```

#### **6. Save Request Button Section**
```html
<!-- Save Request Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
```

#### **7. Saved Requests Grid Section**
```html
<!-- Saved Requests Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp and Store_type<>'1' and pharm_dispense_indicator = 1";

// Item Data Source
SqlDataSource item_code_data_source = new SqlDataSource();
item_code_data_source.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
item_code_data_source.SelectCommand = "select distinct Itemcode, CONCAT(Inventories_Item_Settings.arabic_name, ' - ' , concentration , ' - ' , description) as arabic_name from Inventories_Stock inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Stock.Itemcode inner join Inventories_Item_Settings_drug_sheet I on I.Item_Settings_fk = Inventories_Item_Settings.id left join Inventories_UOM on Inventories_UOM.id = I.concentration_unit where storeid=@code and MoveType in (3)";

// Usage Data Source
SqlDataSource DSData = new SqlDataSource();
DSData.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DSData.SelectCommand = "select StockDate, Expiration_date, Inventories_UOM.description, Amount_Done_Exchange from Inventories_Stock inner join Inventories_UOM on Inventories_Stock.ItemUnit_Exchange_id = Inventories_UOM.id where Inventories_Stock.StockDate between @date and @date2 and MoveType = 3 and Itemcode = @item_comp_box and storeid = @inv_id";

// Expiration Date Data Source
SqlDataSource expireDateDS = new SqlDataSource();
expireDateDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
expireDateDS.SelectCommand = "select Distinct CONVERT(char(10),Expiration_date,126) as Expiration_date from Inventories_Stock inner join Inventories_UOM on Inventories_Stock.ItemUnit_Exchange_id = Inventories_UOM.id where Inventories_Stock.StockDate between @date and @date2 and MoveType = 3 and Itemcode = @item_comp_box and storeid = @inv_id";

// Temporary Request Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select distinct Inventories_Stock_saving_temp.id, iss.arabic_name, format(StockDate,'yyyy-MM-dd') as StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, format(Expiration_date,'yyyy-MM-dd') as Expiration_date, Inventories_UOM.description, uom_delviery.description, uom_storage.description, uom_exchange.description, reused_number, Price_unit_usage, CAST((Price_unit_usage*reused_number) AS DECIMAL(10, 2)) as TotalPrice from Inventories_Stock_saving_temp inner join Inventories_UOM on Inventories_UOM.id=Inventories_Stock_saving_temp.ItemUnit_Purchase_Id inner join Inventories_UOM uom_delviery on uom_delviery.id=Inventories_Stock_saving_temp.ItemUnit_delivery_id inner join Inventories_UOM uom_storage on uom_storage.id=Inventories_Stock_saving_temp.ItemUnit_storage_Id inner join Inventories_UOM uom_exchange on uom_exchange.id=Inventories_Stock_saving_temp.ItemUnit_Exchange_id inner join Inventories_Item_Settings iss on iss.item_code=Inventories_Stock_saving_temp.Itemcode where user_Temp=@user_id";

// Saved Requests Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select distinct Inventories_Stock_saving_requested.id, iss.arabic_name, format(StockDate,'yyyy-MM-dd') as StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, format(Expiration_date,'yyyy-MM-dd') as Expiration_date, Inventories_UOM.description, uom_delviery.description, uom_storage.description, uom_exchange.description, reused_number, doc_id_saving, Price_unit_usage, CAST((Price_unit_usage*reused_number) AS DECIMAL(10, 2)) as TotalPrice from Inventories_Stock_saving_requested inner join Inventories_UOM on Inventories_UOM.id=Inventories_Stock_saving_requested.ItemUnit_Purchase_Id inner join Inventories_UOM uom_delviery on uom_delviery.id=Inventories_Stock_saving_requested.ItemUnit_delivery_id inner join Inventories_UOM uom_storage on uom_storage.id=Inventories_Stock_saving_requested.ItemUnit_storage_Id inner join Inventories_UOM uom_exchange on uom_exchange.id=Inventories_Stock_saving_requested.ItemUnit_Exchange_id inner join Inventories_Item_Settings iss on iss.item_code=Inventories_Stock_saving_requested.Itemcode where request_user=@user_id";

// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name, Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";
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
        // Clear usage data grid
        Data.DataSource = null;
        Data.DataBind();
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading usage data
**Error Prevention**: Prevents usage data loading without item selection

### Exchange Days Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (Convert.ToInt32(exchangeDays.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال دورة المنصرف');", true);
        return;
    }
    // ... additional validation
}
```

**Exchange Days Logic**: Validates exchange days is positive and within limits
**Error Prevention**: Prevents search with invalid exchange days

### Saved Quantity Validation

```csharp
protected void add_temp_Click(object sender, EventArgs e)
{
    if (Convert.ToInt32(NewQuntity.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية الموفرة');", true);
        return;
    }
    // ... additional validation
}
```

**Saved Quantity Logic**: Validates saved quantity is positive and within limits
**Error Prevention**: Prevents adding with invalid saved quantity

### Expiration Date Validation

```csharp
protected void add_temp_Click(object sender, EventArgs e)
{
    if (expireDate.Value == "" || expireDate.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار تاريخ انتهاء الصلاحيه');", true);
        return;
    }
    // ... additional validation
}
```

**Expiration Date Logic**: Validates expiration date selection before adding
**Error Prevention**: Prevents adding without expiration date selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading items
- **Item Selection Validation**: Must select item before loading usage data
- **Exchange Days Validation**: Must enter exchange days before search
- **Saved Quantity Validation**: Must enter saved quantity before adding
- **Expiration Date Validation**: Must select expiration date before adding

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and has pharmacy dispense capability
- **Item Validation**: Ensures item has dispense history
- **Exchange Days Validation**: Ensures exchange days is positive and within limits
- **Saved Quantity Validation**: Ensures saved quantity is positive and within limits
- **Expiration Date Validation**: Ensures expiration date is valid and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify saving request records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: "تم البحث بنجاح" (Search completed successfully)
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

#### **Pharmacy Saving Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Stock` - Stock records with dispensed items
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Item_Settings_drug_sheet` - Drug sheet information
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock_saving_temp` - Temporary saving request records
  - `Inventories_Stock_saving_requested` - Saving request records
- **Integration Details**:
  - Store selection controls item filtering
  - Item selection controls usage data display
  - Usage data displayed with complete details
  - Saving requests tracked with complete information
- **Data Flow**:
  - Stores filtered for user access
  - Items filtered by store
  - Usage data filtered by item and date range
  - Saving requests tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all saving request operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Store information for filtering
  - Item information for usage analysis
  - Usage quantities and dates
- **Data Relationships**:
  - Stores linked to items via storeid
  - Items linked to usage data via Itemcode
  - Saving requests tracked by user

#### **Usage and Saving Information**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with dispensed items
  - `Inventories_Stock_saving_temp` - Temporary saving request records
  - `Inventories_Stock_saving_requested` - Saving request records
- **Real-time Data**:
  - Usage data and descriptions
  - Saving quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to usage data via Itemcode
  - Saving requests linked to items via Itemcode
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all saving request operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before loading usage data
- **Solution**: Always select item before loading usage data
- **Prevention**: Item selection is required for all saving request operations

#### **"الرجاء ادخال دورة المنصرف" Error**
- **Cause**: Exchange days not entered before search
- **Solution**: Always enter exchange days before search
- **Prevention**: Exchange days entry is required for all saving request operations

#### **"الرجاء ادخال الكمية الموفرة" Error**
- **Cause**: Saved quantity not entered before adding
- **Solution**: Always enter saved quantity before adding
- **Prevention**: Saved quantity entry is required for all saving request operations

#### **"الرجاء اختيار تاريخ انتهاء الصلاحيه" Error**
- **Cause**: Expiration date not selected before adding
- **Solution**: Always select expiration date before adding
- **Prevention**: Expiration date selection is required for all saving request operations

#### **No Usage Data Found**
- **Cause**: Item has no dispense history
- **Solution**: Verify item has dispense history before selection
- **Prevention**: Ensure items have dispense history

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
- **Saving Request Access**: Access to saving request operations
- **Store Access**: Access to stores with pharmacy dispense capability

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Saving Request Workflow**: Understanding of saving request process
- **Store Management**: Knowledge of store selection and filtering
- **Item Management**: Knowledge of item selection and usage analysis
- **Request Management**: Familiarity with request save and delete operations

## Usage Examples

### Basic Saving Request Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for item filtering
3. **Item Selection**: Select item for usage analysis
4. **Exchange Days Entry**: Enter exchange days for usage calculation
5. **Usage Data Review**: Review usage data in grid
6. **Saved Quantity Entry**: Enter saved quantity for each item
7. **Expiration Date Selection**: Select expiration date for each item
8. **Item Addition**: Add item to temporary request grid
9. **Repeat Items**: Add additional request items as needed
10. **Request Save**: Save complete saving request

### Usage Analysis Workflow

1. **Store Selection**: Select store for item filtering
2. **Item Selection**: Select item for usage analysis
3. **Exchange Days Entry**: Enter exchange days for usage calculation
4. **Usage Data Review**: Review usage data in grid
5. **Usage Analysis**: Analyze usage patterns and trends
6. **Saving Identification**: Identify potential saving opportunities
7. **Request Creation**: Create saving request based on analysis

### Multi-Item Saving Request Management

1. **Store Selection**: Select store for item filtering
2. **Multiple Item Selection**: Select multiple items for saving request
3. **Exchange Days Entry**: Enter exchange days for each item
4. **Usage Data Review**: Review usage data for each item
5. **Saved Quantity Entry**: Enter saved quantity for each item
6. **Expiration Date Selection**: Select expiration date for each item
7. **Item Addition**: Add all items to temporary request grid
8. **Request Save**: Save complete saving request with all items