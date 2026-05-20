← Go back to 
[Inventories Module Documentation](/Inventories)


# Replacement_Add.aspx

## Overview

**File**: `\Inventories\Process\Replacement_Add.aspx`
**Purpose**: Replacement and addition system for inventory items with storage configuration
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, warehouse managers, procurement personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document Selection (Required for Loading Items)**
- **Document Dropdown**: Must select valid document for loading items
- **Error Prevention**: System validates document is selected before loading items
- **Data Source**: Inventories_Examination_receipt table with document information
- **Default Behavior**: User must select document manually
- **Error Message**: Validation prevents item loading without document selection
- **Validation**: Only documents with Examination_done=1 and receipt_done=1 are available

#### 2. **Item Selection (Required for Addition)**
- **Item Grid Selection**: Must select valid item from document items
- **Error Prevention**: System validates item is selected before addition
- **Data Source**: Inventories_Examination_receipt table with item information
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents addition without item selection
- **Validation**: Only items with Adding_Rep_indecator=0 are available

#### 3. **Storage Unit Selection (Required for Addition)**
- **Storage Unit Dropdown**: Must select valid storage unit for addition
- **Error Prevention**: System validates storage unit is selected before addition
- **Data Source**: Inventories_UOM table with storage unit information
- **Default Behavior**: User must select storage unit manually
- **Error Message**: Validation prevents addition without storage unit selection
- **Validation**: Only active storage units are available

#### 4. **Usage Unit Selection (Required for Addition)**
- **Usage Unit Dropdown**: Must select valid usage unit for addition
- **Error Prevention**: System validates usage unit is selected before addition
- **Data Source**: Inventories_UOM table with usage unit information
- **Default Behavior**: User must select usage unit manually
- **Error Message**: Validation prevents addition without usage unit selection
- **Validation**: Only active usage units are available

#### 5. **Passage Selection (Required for Addition)**
- **Passage Dropdown**: Must select valid passage for addition
- **Error Prevention**: System validates passage is selected before addition
- **Data Source**: Inventories_wharehouse_passage table with passage information
- **Default Behavior**: User must select passage manually
- **Error Message**: Validation prevents addition without passage selection
- **Validation**: Only active passages are available

#### 6. **Shelf Selection (Required for Addition)**
- **Shelf Dropdown**: Must select valid shelf for addition
- **Error Prevention**: System validates shelf is selected before addition
- **Data Source**: Inventories_wharehouse_Racks table with shelf information
- **Default Behavior**: User must select shelf manually
- **Error Message**: Validation prevents addition without shelf selection
- **Validation**: Only active shelves are available

#### 7. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason for rejection
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without rejection reason selection
- **Validation**: Only active rejection reasons with type=19 are available

### Common Error Scenarios and Prevention

#### **Document Selection Errors**
- **Error**: No document selected
- **Prevention**: Always select document before loading items
- **Error**: Document has no items pending addition
- **Prevention**: Verify document has items pending addition

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before addition
- **Error**: Item already added
- **Prevention**: Verify item is not already added

#### **Storage Configuration Errors**
- **Error**: No storage unit selected
- **Prevention**: Always select storage unit before addition
- **Error**: No usage unit selected
- **Prevention**: Always select usage unit before addition
- **Error**: No passage selected
- **Prevention**: Always select passage before addition
- **Error**: No shelf selected
- **Prevention**: Always select shelf before addition

#### **Addition Management Errors**
- **Error**: Addition fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected before rejection

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have addition permissions** via employee group assignments
3. **Documents must be pending addition** in the system
4. **Items must be available** for addition
5. **Storage units must be configured** in the system
6. **Passages and shelves must be configured** in the system

#### **Required System State**
- User authentication must be active
- Addition permissions must be configured
- Document data must be current
- Item data must be available
- Storage configuration must be current

### Success Criteria

#### **For Document Selection**
- ✅ Document dropdown populated with pending documents only
- ✅ Document validation ensures proper item loading
- ✅ Document selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected document
- ✅ Item details show complete information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Storage Configuration**
- ✅ Storage unit dropdown populated with active units only
- ✅ Usage unit dropdown populated with active units only
- ✅ Passage dropdown populated with active passages only
- ✅ Shelf dropdown populated with active shelves only

#### **For Addition Management**
- ✅ Addition creates proper addition records
- ✅ Item selection enables addition workflow
- ✅ Addition workflow works with proper validation
- ✅ Addition completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for replacement and addition

### Department and Document Selection Section

```html
<!-- Department and Document Selection -->
<dx:BootstrapLayoutGroup Caption="اضافة الاستبدال" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="txt_doc_no" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="doc_data_sorce" ValueField="doc_id" TextField="doc_id">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text="بحث" OnClick="search_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Document Items Grid Section

```html
<!-- Document Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="grid_GridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" AutoPostBack="True" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource7" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomColumnDisplayText="grid_GridView1_CustomColumnDisplayText" OnSelectionChanged="grid_GridView1_SelectionChanged1">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                            <SettingsEditForm Visible="False"></SettingsEditForm>
                        </dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" Visible="false" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="16"></dx:BootstrapGridViewDateColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="false" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الباتش" Visible="false" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" Visible="false" VisibleIndex="23"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="رقم اللجنة" Visible="false" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="FK_stock" Caption="رقم سطر الstock" Visible="false" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="FK_Exchange_details" Caption="الاستبدال dt" VisibleIndex="24" Visible="false"></dx:BootstrapGridViewTextColumn>
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

### Storage Configuration Section

```html
<!-- Storage Configuration -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="وحدة التخزين" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="storage_unit" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource2" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                            <dx:BootstrapListBoxField FieldName="Quantity" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="usage_unit" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource3" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                            <dx:BootstrapListBoxField FieldName="Quantity" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم الممر" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="passive_id" runat="server" TextFormatString="{1}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource4" ValueField="id" TextField="english_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="english_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم الرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Shelf" runat="server" TextFormatString="{1}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource33" ValueField="id" TextField="english_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="english_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Adding" runat="server" ClientInstanceName="btn4" Width="100%" Text="اضافة" OnClick="Adding_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Width="100%" Text="رفض اذن الاضافة" OnClick="reject_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="reject_reason" AutoPostBack="true" runat="server" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15" Enabled="true" Width="100%">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="reason" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Added Items Grid Section

```html
<!-- Added Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="Bootstrap_end_adding" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource1" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false">
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                        <SettingsBehavior AllowSelectByRowClick="true" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" SelectAllCheckboxMode="AllPages" VisibleIndex="0" Width="6%" />
                            <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="المستلم" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="المتبقى" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="passage_id" Caption="الممر" Visible="true" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="shelf_id" Caption="الرف" Visible="true" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="deliver_unit" Caption="وحدةالاستلام" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="purchase_unit" Caption="وحدة الشراء" VisibleIndex="19"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="storage_unit" Caption="وحدة التخزين" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="exchange_unit" Caption="وحدة الصرف" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="26"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الباتش" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="FK_Exchange_details" Caption="الاستبدال dt" VisibleIndex="24" Visible="false"></dx:BootstrapGridViewTextColumn>
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
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="txt_save" runat="server" Width="100%" Text="حفظ" OnClick="txt_save_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
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
- `@emp` - Employee code for filtering stores and permissions

**Document Parameters**:
- `@doc_id` - Document ID for filtering items
- `@doc` - Document ID for filtering items

**Store Parameters**:
- `@store_id` - Store ID for filtering passages and shelves

**Item Parameters**:
- `@itemcode` - Item code for filtering units

**Passage Parameters**:
- `@passive_id` - Passage ID for filtering shelves

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Selection**: Loads items based on selected document
3. **Item Selection**: Loads item information for selected item
4. **Storage Configuration**: Loads storage units, passages, and shelves
5. **Item Addition**: Adds item to temporary addition grid
6. **Addition Save**: Saves complete addition records
7. **Rejection**: Rejects addition with reason

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads document information
3. Sets default addition state
4. Initializes date displays

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Searches for items based on selected document

**Process**:
1. Validates document selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates document information display

### Adding_Click Method

```csharp
protected void Adding_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary addition grid

**Process**:
1. Validates all required fields are filled
2. Validates item is selected
3. Validates storage configuration
4. Inserts item into temporary table
5. Refreshes temporary addition grid
6. Clears form fields for next addition

### txt_save_Click Method

```csharp
protected void txt_save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete addition records

**Process**:
1. Validates at least one item is added
2. Generates new addition document number
3. Inserts addition header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects addition with reason

**Process**:
1. Validates document selection
2. Validates rejection reason selection
3. Updates document status to rejected
4. Refreshes item grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Inventories_Examination_receipt**
- **Purpose**: Examination receipt records
- **Key Fields**: ID, doc_id, Itemcode, Amount, Done_Amount, Remain_Amount, Price_unit, Total_Price, Grand_Total, Store_id, Purchase_Id_unit, delivery_id_unit, storage_Id_unit, Exchange_id_unit, Expiration_date, batch_no, Emp_code, date_time, fk_check, Examination_done, receipt_done, Adding_Rep_indecator, passage_id, shelf_id, exchang_batch_no, FK_Exchange_details
- **Usage**: Tracks examination receipt items for addition
- **Filtering**: Only items with Examination_done=1 and receipt_done=1

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, Quantity
- **Usage**: Provides unit information for items
- **Filtering**: Only active units

#### **Inventories_wharehouse_passage**
- **Purpose**: Warehouse passage master data
- **Key Fields**: id, english_name, Store_id, active
- **Usage**: Provides passage list for filtering
- **Filtering**: Only active passages for selected store

#### **Inventories_wharehouse_Racks**
- **Purpose**: Warehouse rack/shelf master data
- **Key Fields**: id, english_name, passage_id, active
- **Usage**: Provides shelf list for filtering
- **Filtering**: Only active shelves for selected passage

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for rejection
- **Filtering**: Only active reasons with type=19

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
**Validation**: Ensures user is authenticated before accessing addition data

#### **Document Filtering**
```sql
select distinct Inventories_Examination_receipt.doc_id from Inventories_Examination_receipt 
where Examination_done='1' and receipt_done='1' and move_indecator=2 and Adding_Rep_indecator in (0,1)
```

**Filtering Logic**: Shows only documents pending addition
**Permission Logic**: Only documents pending addition are available
**Validation**: Ensures document has items pending addition

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to document, storage unit, usage unit, passage, and shelf dropdowns

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

#### **1. Department and Document Selection Section**
```html
<!-- Department and Document Selection -->
<dx:BootstrapLayoutGroup Caption="اضافة الاستبدال" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Document Items Grid Section**
```html
<!-- Document Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

#### **3. Storage Configuration Section**
```html
<!-- Storage Configuration -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="وحدة التخزين" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم الممر" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم الرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Added Items Grid Section**
```html
<!-- Added Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

#### **5. Save Button Section**
```html
<!-- Save Button -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
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

// Document Data Source
SqlDataSource doc_data_sorce = new SqlDataSource();
doc_data_sorce.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
doc_data_sorce.SelectCommand = "select distinct Inventories_Examination_receipt.doc_id from Inventories_Examination_receipt where Examination_done='1' and receipt_done='1' and move_indecator=2 and Adding_Rep_indecator in (0,1)";

// Document Items Data Source
SqlDataSource SqlDataSource7 = new SqlDataSource();
SqlDataSource7.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource7.SelectCommand = "SELECT ex.exchang_batch_no, ex.ID, null as NUM, ss.arabic_name, Itemcode, Amount, Done_Amount, Remain_Amount, Price_unit, Total_Price, Grand_Total, Store_id, Purchase_Id_unit, Inventories_UOM.description, delivery_id_unit, uom.description as uom_deliver_unit, Expiration_date, batch_no, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num, FK_stock, ex.FK_Exchange_details, ex.batch_no FROM Inventories_Examination_receipt ex inner join Inventories_UOM on Inventories_UOM.id=ex.delivery_id_unit inner join Inventories_UOM as uom on uom.id=ex.Purchase_Id_unit inner join Inventories_Item_Settings ss on ss.item_code=ex.Itemcode where ex.doc_id=@doc and ex.Examination_done='1' and ex.receipt_done='1' and move_indecator=2 and ex.Adding_Rep_indecator in (0)";

// Storage Unit Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select uo.id, uo.description, un.Quantity from Inventories_UOM uo inner join Inventories_UOM_item_unit un on uo.id = un.unit_id where unit_type_id='3' and item_code=@itemcode and (uo.active = 1)";

// Usage Unit Data Source
SqlDataSource SqlDataSource3 = new SqlDataSource();
SqlDataSource3.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource3.SelectCommand = "select uo.id, uo.description, un.Quantity from Inventories_UOM uo inner join Inventories_UOM_item_unit un on uo.id = un.unit_id where unit_type_id='4' and item_code=@itemcode and (uo.active = 1)";

// Passage Data Source
SqlDataSource SqlDataSource4 = new SqlDataSource();
SqlDataSource4.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource4.SelectCommand = "select distinct wp.id, wp.english_name from Inventories_wharehouse_store ws inner join Inventories_wharehouse_passage wp on ws.id=wp.Store_id where Store_id=@store_id and wp.active='1'";

// Shelf Data Source
SqlDataSource SqlDataSource33 = new SqlDataSource();
SqlDataSource33.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource33.SelectCommand = "select id, english_name from Inventories_wharehouse_Racks where passage_id=@passive_id and Inventories_wharehouse_Racks.active='1'";

// Rejection Reason Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=19";

// Added Items Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "SELECT ex.ID, null as NUM, ss.arabic_name, Itemcode, Amount, Done_Amount, Remain_Amount, Price_unit, Total_Price, Grand_Total, Store_id, uom1.description as deliver_unit, uom2.description as purchase_unit, uom3.description as storage_unit, uom4.description as exchange_unit, ex.delivery_id_unit, ex.Purchase_Id_unit, ex.storage_Id_unit, ex.Exchange_id_unit, Expiration_date, batch_no, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num, FK_stock, ex.FK_Exchange_details, ex.passage_id, ex.shelf_id, exchang_batch_no FROM Inventories_Examination_receipt ex inner join Inventories_UOM as uom1 on uom1.id=ex.delivery_id_unit inner join Inventories_UOM as uom2 on uom2.id=ex.Purchase_Id_unit inner join Inventories_UOM as uom3 on uom3.id=ex.storage_Id_unit inner join Inventories_UOM as uom4 on uom4.id=ex.Exchange_id_unit inner join Inventories_Item_Settings ss on ss.item_code=ex.Itemcode where Examination_done='1' and receipt_done='1' and Adding_Rep_indecator='1' and doc_id=@doc_id";
```

## Business Logic and Validation

### Document Selection Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Value == "" || txt_doc_no.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند');", true);
        return;
    }
    // ... additional validation
}
```

**Document Logic**: Validates document selection before loading items
**Error Prevention**: Prevents item loading without document selection

### Item Selection Validation

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    if (grid_GridView1.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before addition
**Error Prevention**: Prevents addition without item selection

### Storage Configuration Validation

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    if (storage_unit.Value == "" || storage_unit.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار وحدة التخزين');", true);
        return;
    }
    // ... additional validation
}
```

**Storage Logic**: Validates storage configuration before addition
**Error Prevention**: Prevents addition without storage configuration

### Rejection Reason Validation

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (reject_reason.Value == "" || reject_reason.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    // ... additional validation
}
```

**Rejection Reason Logic**: Validates rejection reason before rejection
**Error Prevention**: Prevents rejection without rejection reason

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Selection Validation**: Must select document before loading items
- **Item Selection Validation**: Must select item before addition
- **Storage Unit Validation**: Must select storage unit before addition
- **Usage Unit Validation**: Must select usage unit before addition
- **Passage Validation**: Must select passage before addition
- **Shelf Validation**: Must select shelf before addition
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Validation**: Ensures document is pending addition
- **Item Validation**: Ensures item is pending addition
- **Storage Validation**: Ensures storage configuration is valid
- **Rejection Reason Validation**: Ensures rejection reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Document Access**: Ensures user has access to selected document
- **Addition Access**: Ensures user can access and modify addition records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Addition Save Success**: "تم حفظ الاضافة" (Addition saved successfully)
- **Rejection Success**: "تم رفض الاضافة" (Addition rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Replacement and Addition Management System**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Inventories_Examination_receipt` - Examination receipt records
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_wharehouse_passage` - Passage master data
  - `Inventories_wharehouse_Racks` - Shelf master data
  - `Inventories_Reasons` - Rejection reason master data
- **Integration Details**:
  - Document selection controls item filtering
  - Item selection controls addition workflow
  - Storage configuration controls addition location
  - Addition tracked with complete information
- **Data Flow**:
  - Documents filtered for user access
  - Items filtered by document
  - Storage configuration filtered by store
  - Addition tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all addition operations
  - Document access controlled by user permissions

### Data Exchange

#### **Document and Item Information**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Examination receipt records
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Document information for addition
  - Item quantities and prices
- **Data Relationships**:
  - Documents linked to items via doc_id
  - Addition tracked by user

#### **Storage and Location Information**
- **Database Tables**:
  - `Inventories_wharehouse_passage` - Passage master data
  - `Inventories_wharehouse_Racks` - Shelf master data
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Storage configuration and location
  - Unit information and calculations
- **Data Relationships**:
  - Passages linked to stores via Store_id
  - Shelves linked to passages via passage_id
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار رقم المستند" Error**
- **Cause**: Document not selected before loading items
- **Solution**: Always select document before loading items
- **Prevention**: Document selection is required for all addition operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before addition
- **Solution**: Always select item before addition
- **Prevention**: Item selection is required for all addition operations

#### **"الرجاء اختيار وحدة التخزين" Error**
- **Cause**: Storage unit not selected before addition
- **Solution**: Always select storage unit before addition
- **Prevention**: Storage unit selection is required for all addition operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **No Documents Found**
- **Cause**: No documents pending addition
- **Solution**: Verify documents are pending addition
- **Prevention**: Ensure documents are pending addition

#### **Addition Save Failed Error**
- **Cause**: Addition cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

#### **Rejection Failed Error**
- **Cause**: Rejection cannot be processed
- **Solution**: Verify rejection reason is selected before rejection
- **Prevention**: Ensure proper validation before rejection

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Addition Access**: Access to addition operations
- **Document Access**: Access to documents with addition items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Addition Workflow**: Understanding of addition process
- **Document Management**: Knowledge of document selection and addition
- **Storage Management**: Knowledge of storage configuration and location
- **Addition Management**: Familiarity with addition save and rejection operations

## Usage Examples

### Basic Addition Workflow

1. **Page Load**: Verify page loads with default data
2. **Document Selection**: Select document for addition
3. **Item Review**: Review items in document items grid
4. **Item Selection**: Select specific items for addition
5. **Storage Configuration**: Configure storage units and location
6. **Item Addition**: Add item to temporary addition grid
7. **Repeat Items**: Add additional items as needed
8. **Addition Save**: Save complete addition records

### Rejection Workflow

1. **Document Selection**: Select document for rejection
2. **Item Review**: Review items in document items grid
3. **Rejection Reason Selection**: Select rejection reason
4. **Rejection**: Click reject button to process rejection

### Multi-Item Addition Management

1. **Document Selection**: Select document for addition
2. **Multiple Item Selection**: Select multiple items for addition
3. **Storage Configuration**: Configure storage for each item
4. **Item Addition**: Add all items to temporary addition grid
5. **Addition Save**: Save complete addition with all items
6. **Location Verification**: Verify items are added to correct locations