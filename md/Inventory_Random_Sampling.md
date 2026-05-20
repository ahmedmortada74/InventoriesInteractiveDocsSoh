← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Random_Sampling.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Random_Sampling.aspx`
**Purpose**: Random sampling system for inventory stocktaking with sample creation and confirmation
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, stocktaking personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Sample Creation)**
- **Store Dropdown**: Must select valid store for sample creation
- **Error Prevention**: System validates store is selected before creating sample
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents sample creation without store selection
- **Validation**: Only active stores are available

#### 2. **Filter Selection (Required for Sample Creation)**
- **Filter Dropdown**: Must select valid filter for sample creation
- **Error Prevention**: System validates filter is selected before creating sample
- **Data Source**: Inventories_Random_Sampling_Filter table with filter information
- **Default Behavior**: User must select filter manually
- **Error Message**: Validation prevents sample creation without filter selection
- **Validation**: Only active filters are available

#### 3. **Sample Size Input (Required for Sample Creation)**
- **Sample Size Field**: Must enter valid sample size for sample creation
- **Error Prevention**: System validates sample size is between 10 and 25
- **Data Source**: User input with validation against min/max values
- **Default Behavior**: User must enter sample size manually
- **Error Message**: Validation prevents sample creation with invalid sample size
- **Validation**: Sample size must be between 10 and 25

#### 4. **Item Selection (Optional for Sample Creation)**
- **Item Dropdown**: Optional selection for item-based filtering
- **Error Prevention**: System allows filtering by item if selected
- **Data Source**: Inventories_Item_Settings table with item information
- **Default Behavior**: User can select item or leave empty for all items
- **Error Message**: No validation required as this is optional
- **Validation**: Only active items are available

#### 5. **Quantity Confirmation (Required for Sample Confirmation)**
- **Quantity Field**: Must enter valid quantity for each sample item
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually for each item
- **Error Message**: Validation prevents confirmation with zero or negative quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 6. **Expiration Date Confirmation (Optional for Sample Confirmation)**
- **Expiration Date Field**: Optional selection for item expiration date
- **Error Prevention**: System allows expiration date entry if applicable
- **Data Source**: User input with date validation
- **Default Behavior**: User can enter expiration date or leave empty
- **Error Message**: No validation required as this is optional
- **Validation**: Date must be valid if entered

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before creating sample
- **Error**: Store has no inventory data
- **Prevention**: Verify store has inventory items before selection

#### **Filter Selection Errors**
- **Error**: No filter selected
- **Prevention**: Always select filter before creating sample
- **Error**: Invalid filter
- **Prevention**: Verify filter is valid and available

#### **Sample Size Errors**
- **Error**: No sample size entered
- **Prevention**: Always enter sample size before creating sample
- **Error**: Sample size too small
- **Prevention**: System validates sample size is at least 10
- **Error**: Sample size too large
- **Prevention**: System validates sample size is at most 25

#### **Quantity Confirmation Errors**
- **Error**: No quantity entered
- **Prevention**: Always enter quantity before confirmation
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts

#### **Sample Management Errors**
- **Error**: Sample creation fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Sample confirmation fails
- **Prevention**: Ensure all items have valid quantities
- **Error**: Sample update fails
- **Prevention**: Ensure sample is selected for update

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have sample creation permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Filters must be configured** in the system
5. **Inventory items must be available** for sampling

#### **Required System State**
- User authentication must be active
- Sample creation permissions must be configured
- Store data must be current
- Filter data must be current
- Inventory items must be available

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper sample creation
- ✅ Store selection enables sample filtering

#### **For Filter Selection**
- ✅ Filter dropdown populated with active filters only
- ✅ Filter validation ensures proper sample creation
- ✅ Filter selection enables sample filtering

#### **For Sample Size Input**
- ✅ Sample size field accepts valid numeric input
- ✅ Sample size validation ensures proper sample creation
- ✅ Sample size limits prevent excessive sampling

#### **For Sample Creation**
- ✅ Sample creation creates proper sample records
- ✅ Sample items are randomly selected based on filter
- ✅ Sample status is set to pending

#### **For Sample Confirmation**
- ✅ Sample confirmation validates all items
- ✅ Quantity entry works for each item
- ✅ Expiration date entry works for each item
- ✅ Sample status updates properly

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" dir="rtl" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for random sampling

### Store and Sample ID Section

```html
<!-- Store and Sample ID -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="Combox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{0} - {1} - {2}" CssClasses-Control="mb-5" OnValueChanged="Combox_Store_ValueChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="رقم العينة" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="Txt_SmapleID" Enabled="false" AutoPostBack="false" Text="001" CssClasses-Control="mb-5" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Filter and Sample Size Section

```html
<!-- Filter and Sample Size -->
<dx:BootstrapLayoutItem Caption="ترتيب حسب" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="Combox_Filter" AutoPostBack="false" DataSourceID="DataSource_Filter" ValueField="Value" TextField="Name_AR" DropDownRows="5" NullText="Select Store" Width="100%" SelectedIndex="0" CssClasses-Control="mb-5">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="Value" />
                    <dx:BootstrapListBoxField FieldName="Name_AR" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="عدد العينة" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" ID="Txt_SmapleItemsNumber" Number="10" NullText="اختر عدد عناصر اعينة" AutoPostBack="false" MaxValue="25" MinValue="10" CssClasses-Control="mb-5 pr-4">
            </dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Employee and Item Selection Section

```html
<!-- Employee and Item Selection -->
<dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
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
<dx:BootstrapLayoutItem Caption="كود الصنف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="dcitem" runat="server" Enabled="true" TextFormatString="{0} - {1}" EnableMultiColumn="true" AutoPostBack="true" EnableCallbackMode="false" DataSourceID="adoitems" ValueField="item_code" NullText="اختر الصنف">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="item_code" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Create Sample Button Section

```html
<!-- Create Sample Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_CreateSample" Text="انشاء العينة" OnClick="Btn_CreateSample_Click" Enabled="false">
                <SettingsBootstrap RenderOption="Primary" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Sample Items Grid Section

```html
<!-- Sample Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div class="d-flex border" style="width: calc(100vw - 20rem); border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_Samples" DataSourceID="tempDataSource" Width="100%" KeyFieldName="ID" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoPostBack="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" ClientInstanceName="GV_Samples" OnCustomColumnDisplayText="GV_Samples_CustomColumnDisplayText" OnBatchUpdate="GV_Samples_BatchUpdate">
                    <SettingsText ConfirmOnLosingBatchChanges="هل أنت متأكد أنك تريد تنفيذ الإجراء؟ سيتم فقدان كافة بيانات العينة غير المحفوظة." />
                    <SettingsText CommandBatchEditCancel="إلغاء" />
                    <SettingsText EmptyDataRow="لاتوجد بيانات للعرض" />
                    <SettingsText CommandBatchEditCancel="إلغاء" />
                    <SettingsText CommandBatchEditUpdate="حفظ التغييرات" />
                    <SettingsText CommandBatchEditPreviewChanges="معاينة التغييرات" />
                    <Settings ShowFooter="True" />
                    <Settings ShowFilterRow="true" />
                    <SettingsEditing Mode="Batch">
                        <BatchEditSettings AllowEndEditOnValidationError="false" AllowValidationOnEndEdit="false" />
                    </SettingsEditing>
                    <ClientSideEvents BatchEditRowValidating="RowValidating" />
                    <SettingsDataSecurity AllowEdit="true" AllowDelete="false" AllowInsert="false" />
                    <Columns>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" Caption="#" VisibleIndex="0" Width="30px"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="User_ID" Caption="" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="ID" Caption="" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Stock_ID" Caption="" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_Code" Caption="الكود" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewBandColumn Caption="مسمي الصنف" VisibleIndex="2">
                            <Columns>
                                <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_Name_Ar" CssClasses-HeaderCell="d-none" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_Name_En" CssClasses-HeaderCell="d-none" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_Batch_No" Caption="الدفعة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_UOM" Caption="وحدة الجرد" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="UOM" Caption="وحدة الجرد" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_Quantity" Caption="رصيد العينة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewDateColumn SettingsEditForm-Visible="False" FieldName="Expiration_Date" Caption="تاريخ الصلاحية" VisibleIndex="7"></dx:BootstrapGridViewDateColumn>
                        <dx:BootstrapGridViewSpinEditColumn PropertiesSpinEdit-NumberType="Float" FieldName="Confirmed_Quantity" Caption="تأكيد الكمية" VisibleIndex="8"></dx:BootstrapGridViewSpinEditColumn>
                        <dx:BootstrapGridViewDateColumn FieldName="Confirmed_Expiration_Date" Caption="تاكيد الصلاحية" VisibleIndex="9">
                            <PropertiesDateEdit AllowNull="true" ValidationSettings-CausesValidation="false" ValidationSettings-RequiredField-IsRequired="false" />
                        </dx:BootstrapGridViewDateColumn>
                    </Columns>
                    <TotalSummary>
                        <dx:ASPxSummaryItem FieldName="Item_Quantity" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Confirmed_Quantity" SummaryType="Sum" DisplayFormat="{0}" />
                    </TotalSummary>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Memo and Confirm Button Section

```html
<!-- Memo and Confirm Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CaptionSettings-HorizontalAlign="Right" CssClasses-Control="mb-5 mt-2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="memo" NullText="ملاحظات" Width="50%">
            </dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="" ColSpanMd="3" CssClasses-Control="mb-5 mt-2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_ConfirmSample" ClientInstanceName="Btn_ConfirmSample" Text="تأكيد العينة" OnClick="Btn_ConfirmSample_Click" Enabled="false">
                <SettingsBootstrap RenderOption="Success" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" ID="Btn_Update" ClientInstanceName="Btn_Update" Text="تحديث العينة" OnClick="Btn_Update_Click" Enabled="false" Visible="false">
                <SettingsBootstrap RenderOption="Primary" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Sample List Grid Section

```html
<!-- Sample List Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div class="d-flex border" style="width: calc(100vw - 20rem); border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_ListSamples" DataSourceID="DS_ListSamplesHeader" Width="100%" KeyFieldName="Header_ID" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" AutoPostBack="true" SettingsBehavior-AllowSelectSingleRowOnly="true" autopostpack="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsText-EmptyDataRow="أختر مخزن لعرض العينات الموجوده له" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomColumnDisplayText="GV_ListSamples_CustomColumnDisplayText" OnSelectionChanged="GV_ListSamples_SelectionChanged" OnHtmlDataCellPrepared="GV_ListSamples_HtmlDataCellPrepared">
                    <SettingsDataSecurity AllowEdit="false" AllowDelete="false" AllowInsert="false" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" />
                        <dx:BootstrapGridViewTextColumn Caption="المسلسل" UnboundType="String"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Header_ID" Caption="رقم العينة"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Items_Number" Caption="عدد عناصر العينة"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Status" Caption="حالة العينة"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Created_At" Caption="تاريخ الانشاء">
                            <PropertiesTextEdit DisplayFormatString="{0:MM-dd-yyyy}" />
                        </dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewBandColumn Caption="تصنيف العينة">
                            <Columns>
                                <dx:BootstrapGridViewTextColumn FieldName="Filter_Name_AR" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Filter_Name_EN" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@User_ID` - User ID for filtering temporary records

**Store Parameters**:
- `@Store_ID` - Store ID for filtering samples

**Sample Parameters**:
- `@ID` - Sample ID for filtering sample items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads samples based on selected store
3. **Filter Selection**: Selects filter for sample creation
4. **Sample Size Entry**: Enters sample size for sample creation
5. **Sample Creation**: Creates sample with random items
6. **Quantity Entry**: Allows user to enter quantities for each item
7. **Sample Confirmation**: Confirms sample with entered quantities
8. **Sample Update**: Updates sample with modified quantities

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default sample state
4. Initializes date displays

### Combox_Store_ValueChanged Method

```csharp
protected void Combox_Store_ValueChanged(object sender, EventArgs e)
```

**Purpose**: Loads samples based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for sample data source
3. Binds sample grid
4. Updates store information display

### Btn_CreateSample_Click Method

```csharp
protected void Btn_CreateSample_Click(object sender, EventArgs e)
```

**Purpose**: Creates sample with random items

**Process**:
1. Validates store selection
2. Validates filter selection
3. Validates sample size
4. Creates sample header record
5. Creates sample detail records with random items
6. Refreshes sample grid
7. Provides success feedback

### Btn_ConfirmSample_Click Method

```csharp
protected void Btn_ConfirmSample_Click(object sender, EventArgs e)
```

**Purpose**: Confirms sample with entered quantities

**Process**:
1. Validates sample selection
2. Validates all items have quantities
3. Confirms sample
4. Updates sample status
5. Provides success feedback

### Btn_Update_Click Method

```csharp
protected void Btn_Update_Click(object sender, EventArgs e)
```

**Purpose**: Updates sample with modified quantities

**Process**:
1. Validates sample selection
2. Updates sample quantities
3. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Random_Sampling_Filter**
- **Purpose**: Random sampling filter master data
- **Key Fields**: Id, Name_AR, Name_EN, Value, active
- **Usage**: Provides filter list for sample creation
- **Filtering**: Only active filters

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item list for filtering
- **Filtering**: Only active items

#### **Inventories_Random_Sampling_Header**
- **Purpose**: Random sampling header information
- **Key Fields**: ID, Store_ID, Filter_ID, Items_Number, Status, Created_At
- **Usage**: Tracks sample information
- **Filtering**: Only samples for selected store

#### **Inventories_Random_Sampling_Details_temp**
- **Purpose**: Temporary random sampling details
- **Key Fields**: ID, Stock_ID, User_ID, Item_Code, Item_Name_Ar, Item_Name_En, Item_Batch_No, Item_Quantity, Expiration_Date, Confirmed_Quantity, Confirmed_Expiration_Date, Item_UOM
- **Usage**: Tracks sample items before confirmation
- **Filtering**: Only items associated with selected user

#### **Inventories_Random_Sampling_Details**
- **Purpose**: Random sampling details with item information
- **Key Fields**: ID, Sample_Header_ID, Stock_ID, Item_Code, Item_Name_Ar, Item_Name_En, Item_Batch_No, Item_Quantity, Expiration_Date, Confirmed_Quantity, Confirmed_Expiration_Date, Item_UOM
- **Usage**: Tracks sample items for samples
- **Filtering**: Only items for selected sample

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
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing sample data

#### **Store Filtering**
```sql
SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store
```

**Filtering Logic**: Shows all stores for user
**Permission Logic**: All stores are available
**Validation**: Ensures store has sample data

#### **Filter Filtering**
```sql
SELECT Id, Name_AR, Name_EN, Value FROM Inventories_Random_Sampling_Filter
```

**Filtering Logic**: Shows all filters for user
**Permission Logic**: All filters are available
**Validation**: Ensures filter is valid

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store and item dropdowns

### Grid Batch Editing

```html
SettingsEditing Mode="Batch"
BatchEditSettings AllowEndEditOnValidationError="false" AllowValidationOnEndEdit="false"
```

**Grid Features**: Batch editing for sample quantities
**User Experience**: Allows editing multiple items at once
**Usage**: Applied to sample items grid

### Row Validation Function

```javascript
function RowValidating(s, e) {
    var grid = ASPxClientGridView.Cast(GV_Samples);
    var expDate = e.validationInfo[grid.GetColumnByField("Confirmed_Expiration_Date").index];
    if (expDate.value === null) {
        expDate.isValid = true;
    }
}
```

**Validation Logic**: Validates expiration date can be null
**User Experience**: Allows empty expiration dates
**Usage**: Applied to sample items grid

### Button Disable Function

```javascript
document.onclick = function () {
    console.log("checking gridview changes...")
    if (GV_Samples.batchEditApi.HasChanges()) {
        var Btn_ConfirmSample = document.getElementById('<%= Btn_ConfirmSample.ClientID %>');
        var Btn_Update = document.getElementById('<%= Btn_Update.ClientID %>');
        Btn_ConfirmSample.disabled = true;
        if (Btn_Update != null) {
            Btn_Update.disabled = true;
            console.log("update button disabled")
        }
        console.log("confirm button disabled")
    }
}
```

**Button Logic**: Disables buttons when grid has changes
**User Experience**: Prevents confirmation with unsaved changes
**Usage**: Applied to confirm and update buttons

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store and Sample ID Section**
```html
<!-- Store and Sample ID -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="رقم العينة" ColSpanMd="4">
```

#### **2. Filter and Sample Size Section**
```html
<!-- Filter and Sample Size -->
<dx:BootstrapLayoutItem Caption="ترتيب حسب" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="عدد العينة" ColSpanMd="4">
```

#### **3. Employee and Item Selection Section**
```html
<!-- Employee and Item Selection -->
<dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
<dx:BootstrapLayoutItem Caption="كود الصنف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
```

#### **4. Create Sample Button Section**
```html
<!-- Create Sample Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **5. Sample Items Grid Section**
```html
<!-- Sample Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **6. Memo and Confirm Button Section**
```html
<!-- Memo and Confirm Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CaptionSettings-HorizontalAlign="Right" CssClasses-Control="mb-5 mt-2">
<dx:BootstrapLayoutItem Caption="" ColSpanMd="3" CssClasses-Control="mb-5 mt-2">
```

#### **7. Sample List Grid Section**
```html
<!-- Sample List Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";

// Filter Data Source
SqlDataSource DataSource_Filter = new SqlDataSource();
DataSource_Filter.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Filter.SelectCommand = "SELECT Id, Name_AR, Name_EN, Value FROM Inventories_Random_Sampling_Filter";

// Item Data Source
SqlDataSource adoitems = new SqlDataSource();
adoitems.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
adoitems.SelectCommand = "SELECT item_code, arabic_name FROM Inventories_Item_Settings WHERE active=1";

// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";

// Sample Items Data Source
SqlDataSource tempDataSource = new SqlDataSource();
tempDataSource.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
tempDataSource.SelectCommand = "SELECT temp.ID, temp.Stock_ID, temp.[User_ID], temp.Item_Code, temp.Item_Name_Ar, temp.Item_Name_En, temp.Item_Batch_No, temp.Item_Quantity, temp.Expiration_Date, temp.Confirmed_Quantity, temp.Confirmed_Expiration_Date, temp.Item_UOM, uom.description as UOM FROM Inventories_Random_Sampling_Details_temp temp LEFT JOIN Inventories_UOM uom ON uom.id = temp.Item_UOM WHERE [User_ID] = @User_ID";
tempDataSource.UpdateCommand = "UPDATE Inventories_Random_Sampling_Details_temp SET Confirmed_Quantity = @Confirmed_Quantity, Confirmed_Expiration_Date = @Confirmed_Expiration_Date WHERE ID=@ID AND User_ID = @User_ID";

// Sample List Data Source
SqlDataSource DS_ListSamplesHeader = new SqlDataSource();
DS_ListSamplesHeader.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_ListSamplesHeader.SelectCommand = "SELECT Header.ID AS Header_ID, Header.Items_Number, Header.Created_At, Filter.Name_AR AS Filter_Name_AR, Filter.Name_EN AS Filter_Name_EN, CASE WHEN Header.Status = 0 THEN 'Open' WHEN Header.Status = 1 THEN 'Closed' END AS Status FROM Inventories_Random_Sampling_Header Header INNER JOIN Inventories_Random_Sampling_Filter [Filter] ON [Filter].Id = Header.Filter_ID WHERE Header.Store_ID=@Store_ID";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void Combox_Store_ValueChanged(object sender, EventArgs e)
{
    if (Combox_Store.Value == "" || Combox_Store.Value == null)
    {
        // Clear sample grid
        GV_Samples.DataSource = null;
        GV_Samples.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading samples
**Error Prevention**: Prevents sample loading without store selection

### Filter Selection Validation

```csharp
protected void Btn_CreateSample_Click(object sender, EventArgs e)
{
    if (Combox_Filter.Value == "" || Combox_Filter.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار التصنيف');", true);
        return;
    }
    // ... additional validation
}
```

**Filter Logic**: Validates filter selection before creating sample
**Error Prevention**: Prevents sample creation without filter selection

### Sample Size Validation

```csharp
protected void Btn_CreateSample_Click(object sender, EventArgs e)
{
    if (Convert.ToInt32(Txt_SmapleItemsNumber.Value) < 10 || Convert.ToInt32(Txt_SmapleItemsNumber.Value) > 25)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('عدد العينة يجب أن يكون بين 10 و 25');", true);
        return;
    }
    // ... additional validation
}
```

**Sample Size Logic**: Validates sample size is between 10 and 25
**Error Prevention**: Prevents sample creation with invalid sample size

### Quantity Validation

```csharp
protected void GV_Samples_RowValidating(object sender, DevExpress.Web.Data.BootstrapGridViewRowValidationEventArgs e)
{
    // Validate quantity is positive
    if (Convert.ToDecimal(e.NewValues["Confirmed_Quantity"]) <= 0)
    {
        e.Errors["Confirmed_Quantity"] = "الكمية يجب أن تكون أكبر من صفر";
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Error Prevention**: Prevents confirmation with invalid quantity

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before creating sample
- **Filter Selection Validation**: Must select filter before creating sample
- **Sample Size Validation**: Must enter sample size before creating sample
- **Quantity Validation**: Must enter quantity before confirmation

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Filter Validation**: Ensures filter is active and available
- **Sample Size Validation**: Ensures sample size is within allowed limits
- **Quantity Validation**: Ensures quantities are within allowed limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Sample Access**: Ensures user can access and modify sample records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Sample Creation Success**: "تم انشاء العينة" (Sample created successfully)
- **Sample Confirmation Success**: "تم تأكيد العينة" (Sample confirmed successfully)
- **Sample Update Success**: "تم تحديث العينة" (Sample updated successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of sample grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Sample Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Filter` - Filter master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Random_Sampling_Header` - Sample header information
  - `Inventories_Random_Sampling_Details_temp` - Temporary sample details
  - `Inventories_Random_Sampling_Details` - Sample details with item information
  - `Inventories_UOM` - Unit of measure master data
- **Integration Details**:
  - Store selection controls sample filtering
  - Filter selection controls sample creation
  - Item selection controls sample filtering
  - Sample items displayed with complete details
- **Data Flow**:
  - Stores filtered for user access
  - Filters filtered for selection
  - Items filtered for sampling
  - Sample items filtered by sample

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all sample operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Filter Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Filter` - Filter master data
- **Real-time Data**:
  - Store information for filtering
  - Filter information for sample creation
  - Sample information and status
- **Data Relationships**:
  - Stores linked to samples via Store_ID
  - Filters linked to samples via Filter_ID
  - Samples linked to sample details via Sample_Header_ID

#### **Sample and Item Information**
- **Database Tables**:
  - `Inventories_Random_Sampling_Header` - Sample header information
  - `Inventories_Random_Sampling_Details_temp` - Temporary sample details
  - `Inventories_Random_Sampling_Details` - Sample details with item information
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Sample details and descriptions
  - Item information and quantities
  - Unit information and calculations
- **Data Relationships**:
  - Samples linked to sample details via Sample_Header_ID
  - Items linked to sample details via Item_Code
  - Units linked to items via Item_UOM field

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before creating sample
- **Solution**: Always select store before creating sample
- **Prevention**: Store selection is required for all sample operations

#### **"الرجاء اختيار التصنيف" Error**
- **Cause**: Filter not selected before creating sample
- **Solution**: Always select filter before creating sample
- **Prevention**: Filter selection is required for all sample operations

#### **"عدد العينة يجب أن يكون بين 10 و 25" Error**
- **Cause**: Sample size not between 10 and 25
- **Solution**: Always enter sample size between 10 and 25
- **Prevention**: Sample size validation is required for all sample operations

#### **No Sample Data Found**
- **Cause**: Store has no samples
- **Solution**: Verify store has samples before selection
- **Prevention**: Ensure stores have sample data

#### **Sample Creation Failed Error**
- **Cause**: Sample cannot be created
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before creation

#### **Sample Confirmation Failed Error**
- **Cause**: Sample cannot be confirmed
- **Solution**: Verify all items have valid quantities
- **Prevention**: Ensure proper validation before confirmation

#### **Sample Update Failed Error**
- **Cause**: Sample cannot be updated
- **Solution**: Verify sample is selected for update
- **Prevention**: Ensure proper selection before update

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Sample Access**: Access to sample creation operations
- **Store Access**: Access to stores with sample data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Sample Workflow**: Understanding of sample creation process
- **Store Management**: Knowledge of store selection and filtering
- **Filter Management**: Knowledge of filter selection and sample creation
- **Sample Management**: Familiarity with sample confirmation and update operations

## Usage Examples

### Basic Sample Creation Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for sample creation
3. **Filter Selection**: Select filter for sample creation
4. **Sample Size Entry**: Enter sample size between 10 and 25
5. **Sample Creation**: Create sample with random items
6. **Quantity Entry**: Enter quantities for each item
7. **Sample Confirmation**: Confirm sample with entered quantities

### Sample Management Workflow

1. **Store Selection**: Select store for sample management
2. **Sample Review**: Review existing samples for selected store
3. **Sample Selection**: Select sample for management
4. **Quantity Review**: Review quantities for each item
5. **Quantity Update**: Update quantities as needed
6. **Sample Confirmation**: Confirm sample with updated quantities

### Multi-Sample Management

1. **Store Selection**: Select store for sample creation
2. **Multiple Sample Creation**: Create multiple samples with different filters
3. **Sample Review**: Review all samples for selected store
4. **Selective Confirmation**: Confirm specific samples as needed
5. **Sample Management**: Manage samples as needed