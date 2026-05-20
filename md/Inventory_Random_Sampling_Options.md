← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Random_Sampling_Options.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Random_Sampling_Options.aspx`
**Purpose**: Random sampling options management system for inventory stocktaking
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, stocktaking personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Sample Filtering)**
- **Store Dropdown**: Must select valid store for sample filtering
- **Error Prevention**: System validates store is selected before loading samples
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents sample loading without store selection
- **Validation**: Only active stores are available

#### 2. **Sample Selection (Required for Sample Details)**
- **Sample Grid Selection**: Must select valid sample from sample grid
- **Error Prevention**: System validates sample is selected before loading details
- **Data Source**: Inventories_Random_Sampling_Header table with sample information
- **Default Behavior**: User must select sample manually from grid
- **Error Message**: Validation prevents sample details loading without sample selection
- **Validation**: Only samples with status = 0 (pending) are available

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading samples
- **Error**: Store has no samples
- **Prevention**: Verify store has samples before selection

#### **Sample Selection Errors**
- **Error**: No sample selected
- **Prevention**: Always select sample from grid before viewing details
- **Error**: Sample has no items
- **Prevention**: Verify sample has items before selection

#### **Sample Management Errors**
- **Error**: Sample close fails
- **Prevention**: Ensure sample is selected before closing
- **Error**: Comprehensive inventory open fails
- **Prevention**: Ensure sample is selected before opening comprehensive inventory

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have sample viewing permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Samples must be created** for stores
5. **Sample items must be available** for viewing

#### **Required System State**
- User authentication must be active
- Sample viewing permissions must be configured
- Store data must be current
- Sample data must be current
- Sample items must be available

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper sample loading
- ✅ Store selection enables sample filtering

#### **For Sample Selection**
- ✅ Sample grid displays all samples for selected store
- ✅ Sample details show complete sample information
- ✅ Sample status displays properly for each sample
- ✅ Sample selection enables sample details loading

#### **For Sample Management**
- ✅ Sample close closes sample properly
- ✅ Comprehensive inventory open opens inventory properly
- ✅ Sample status updates properly
- ✅ Sample details display correctly

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for random sampling options

### Store Selection Section

```html
<!-- Store Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapComboBox runat="server" ID="Combox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{0} - {1} - {2}" CssClasses-Control="mb-5" OnSelectedIndexChanged="Combox_Store_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Sample Grid Section

```html
<!-- Sample Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <div class="d-flex">
                <dx:BootstrapGridView runat="server" ID="GV_Samples" Width="100%" KeyFieldName="ID" CssClasses-Control="mb-5" ClientInstanceName="GV_Samples" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsText-EmptyDataRow="لاتوجد بيانات للعرض" OnSelectionChanged="GV_Samples_SelectionChanged" OnHtmlDataCellPrepared="GV_Samples_HtmlDataCellPrepared">
                    <Settings ShowFooter="True" />
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior AllowSelectByRowClick="true" AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="User_ID" Caption="" VisibleIndex="2" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" Caption="كود العينة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Name_AR" Caption="التصنيف" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Items_Number" Caption="عدد العناصر" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Status" Caption="الحالة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Created_At" Caption="تاريخ الانشاء" VisibleIndex="7" PropertiesTextEdit-DisplayFormatString="{0:MM-dd-yyyy}"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="aprrove_store_emp" Caption="كود امين المخزن" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reason_store_memo" Caption="سبب الاعتراض" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="datetime_emp" Caption="تاريخ الاعتماد" VisibleIndex="10" PropertiesTextEdit-DisplayFormatString="{0:dd/MM/yyyy H:mm}"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Confrmd_stauts" Caption="حالة خاصة بالاعتماد" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
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

### Sample Details Grid Section

```html
<!-- Sample Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <div class="d-flex">
                <dx:BootstrapGridView runat="server" ID="GV_SampleDetails" Width="100%" KeyFieldName="ID" DataSourceID="DS_SampleDetails" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoPostBack="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" SettingsText-EmptyDataRow="لاتوجد بيانات للعرض" OnCustomColumnDisplayText="GV_SampleDetails_CustomColumnDisplayText">
                    <Settings ShowFooter="true" />
                    <Settings ShowFilterRow="true" />
                    <SettingsDataSecurity AllowEdit="false" AllowDelete="false" AllowInsert="false" />
                    <Columns>
                        <dx:BootstrapGridViewTextColumn Caption="#" VisibleIndex="0" Width="30px"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" Caption="" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Item_Code" Caption="الكود" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewBandColumn Caption="مسمي الصنف">
                            <CssClasses HeaderCell="text-center" />
                            <Columns>
                                <dx:BootstrapGridViewTextColumn FieldName="Item_Name_Ar" Caption="الاسم العربي" VisibleIndex="2" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Item_Name_En" Caption="الاسم الانجليزي" VisibleIndex="3" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Item_Batch_No" Caption="الدفعة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Item_UOM" Caption="وحدة الجرد" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Item_Quantity" Caption="الكمية" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewDateColumn FieldName="Expiration_Date" Caption="تاريخ الصلاحية" VisibleIndex="7"></dx:BootstrapGridViewDateColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Confirmed_Quantity" Caption="تأكيد الكمية" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewDateColumn FieldName="Confirmed_Expiration_Date" Caption="تأكيد تاريخ الصلاحية" VisibleIndex="9"></dx:BootstrapGridViewDateColumn>
                    </Columns>
                    <TotalSummary>
                        <dx:ASPxSummaryItem FieldName="Item_Quantity" SummaryType="Sum" />
                        <dx:ASPxSummaryItem FieldName="Confirmed_Quantity" SummaryType="Sum" />
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

### Sample Management Buttons Section

```html
<!-- Sample Management Buttons -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_Close" Text="اقفال العينة" OnClick="Btn_Close_Click">
                <SettingsBootstrap RenderOption="Success" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_Open" Text="فتح جرد شامل" OnClick="Btn_Open_Click">
                <SettingsBootstrap RenderOption="Default" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Store Parameters**:
- `@Store_ID` - Store ID for filtering samples

**Sample Parameters**:
- `@ID` - Sample ID for filtering sample details

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads samples based on selected store
3. **Sample Selection**: Loads sample details based on selected sample
4. **Sample Display**: Displays sample items with details
5. **Sample Close**: Closes sample for processing
6. **Comprehensive Inventory Open**: Opens comprehensive inventory for sample

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

### Combox_Store_SelectedIndexChanged Method

```csharp
protected void Combox_Store_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads samples based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for sample data source
3. Binds sample grid
4. Updates store information display

### GV_Samples_SelectionChanged Method

```csharp
protected void GV_Samples_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads sample details based on selected sample

**Process**:
1. Validates sample selection
2. Sets parameters for sample details data source
3. Binds sample details grid
4. Updates sample information display

### Btn_Close_Click Method

```csharp
protected void Btn_Close_Click(object sender, EventArgs e)
```

**Purpose**: Closes sample for processing

**Process**:
1. Validates sample selection
2. Updates sample status to closed
3. Provides success feedback

### Btn_Open_Click Method

```csharp
protected void Btn_Open_Click(object sender, EventArgs e)
```

**Purpose**: Opens comprehensive inventory for sample

**Process**:
1. Validates sample selection
2. Opens comprehensive inventory
3. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Random_Sampling_Header**
- **Purpose**: Random sampling header information
- **Key Fields**: ID, Name_AR, Items_Number, Status, Created_At, aprrove_store_emp, reason_store_memo, datetime_emp, Confrmd_stauts
- **Usage**: Tracks sample information
- **Filtering**: Only samples for selected store

#### **Inventories_Random_Sampling_Details**
- **Purpose**: Random sampling details with item information
- **Key Fields**: ID, Sample_Header_ID, Stock_ID, Item_Code, Item_Name_Ar, Item_Name_En, Item_Batch_No, Item_Quantity, Expiration_Date, Confirmed_Expiration_Date, Confirmed_Quantity, Item_UOM
- **Usage**: Tracks sample items for samples
- **Filtering**: Only items for selected sample

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

#### **Sample Filtering**
```sql
SELECT ID, Name_AR, Items_Number, Status, Created_At, aprrove_store_emp, reason_store_memo, datetime_emp, Confrmd_stauts FROM Inventories_Random_Sampling_Header WHERE Store_ID = @Store_ID
```

**Filtering Logic**: Shows only samples for selected store
**Permission Logic**: Only samples for selected store are available
**Validation**: Ensures sample has items

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store dropdown

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectByRowClick="true"
SettingsBehavior-AllowSelectSingleRowOnly="true"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Single row selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to sample grid

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store Selection Section**
```html
<!-- Store Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
```

#### **2. Sample Grid Section**
```html
<!-- Sample Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **3. Sample Details Grid Section**
```html
<!-- Sample Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Sample Management Buttons Section**
```html
<!-- Sample Management Buttons -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="" ColSpanMd="6">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";

// Sample Details Data Source
SqlDataSource DS_SampleDetails = new SqlDataSource();
DS_SampleDetails.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_SampleDetails.SelectCommand = "SELECT details.ID, details.Stock_ID, details.Item_Code, details.Item_Name_Ar, details.Item_Name_En, details.Item_Batch_No, details.Item_Quantity, details.Expiration_Date, details.Confirmed_Expiration_Date, details.Confirmed_Quantity, details.Item_UOM FROM Inventories_Random_Sampling_Header header INNER JOIN Inventories_Random_Sampling_Details details ON details.Sample_Header_ID = header.ID WHERE header.ID = @ID";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void Combox_Store_SelectedIndexChanged(object sender, EventArgs e)
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

### Sample Selection Validation

```csharp
protected void GV_Samples_SelectionChanged(object sender, EventArgs e)
{
    if (GV_Samples.FocusedRowIndex < 0)
    {
        // Clear sample details grid
        GV_SampleDetails.DataSource = null;
        GV_SampleDetails.DataBind();
        return;
    }
    // ... additional validation
}
```

**Sample Logic**: Validates sample selection before loading sample details
**Error Prevention**: Prevents sample details loading without sample selection

### Sample Close Validation

```csharp
protected void Btn_Close_Click(object sender, EventArgs e)
{
    if (GV_Samples.FocusedRowIndex < 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار العينة');", true);
        return;
    }
    // ... additional validation
}
```

**Sample Close Logic**: Validates sample selection before closing
**Error Prevention**: Prevents sample closing without sample selection

### Comprehensive Inventory Open Validation

```csharp
protected void Btn_Open_Click(object sender, EventArgs e)
{
    if (GV_Samples.FocusedRowIndex < 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار العينة');", true);
        return;
    }
    // ... additional validation
}
```

**Comprehensive Inventory Logic**: Validates sample selection before opening comprehensive inventory
**Error Prevention**: Prevents comprehensive inventory opening without sample selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading samples
- **Sample Selection Validation**: Must select sample before viewing details
- **Sample Close Validation**: Must select sample before closing
- **Comprehensive Inventory Open Validation**: Must select sample before opening comprehensive inventory

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Sample Validation**: Ensures sample is pending and available
- **Sample Details Validation**: Ensures sample details are available

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
- **Sample Close Success**: "تم اقفال العينة" (Sample closed successfully)
- **Comprehensive Inventory Open Success**: "تم فتح جرد شامل" (Comprehensive inventory opened successfully)

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
  - `Inventories_Random_Sampling_Header` - Sample header information
  - `Inventories_Random_Sampling_Details` - Sample details with item information
- **Integration Details**:
  - Store selection controls sample filtering
  - Sample selection controls sample details display
  - Sample items displayed with complete details
- **Data Flow**:
  - Stores filtered for user access
  - Samples filtered by store
  - Sample details filtered by sample

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

#### **Store and Sample Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Header` - Sample header information
- **Real-time Data**:
  - Store information for filtering
  - Sample information and status
  - Sample items and quantities
- **Data Relationships**:
  - Stores linked to samples via Store_ID
  - Samples linked to sample details via Sample_Header_ID
  - Sample details linked to items via Item_Code

#### **Sample and Item Information**
- **Database Tables**:
  - `Inventories_Random_Sampling_Header` - Sample header information
  - `Inventories_Random_Sampling_Details` - Sample details with item information
- **Real-time Data**:
  - Sample details and descriptions
  - Item information and quantities
  - Unit information and calculations
- **Data Relationships**:
  - Samples linked to sample details via Sample_Header_ID
  - Items linked to sample details via Item_Code
  - Unit information calculated from item associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading samples
- **Solution**: Always select store before loading samples
- **Prevention**: Store selection is required for all sample operations

#### **"الرجاء اختيار العينة" Error**
- **Cause**: Sample not selected before viewing details
- **Solution**: Always select sample from grid before viewing details
- **Prevention**: Sample selection is required for all sample operations

#### **No Sample Data Found**
- **Cause**: Store has no samples
- **Solution**: Verify store has samples before selection
- **Prevention**: Ensure stores have sample data

#### **Sample Close Failed Error**
- **Cause**: Sample cannot be closed
- **Solution**: Verify sample is selected before closing
- **Prevention**: Ensure proper selection before closing

#### **Comprehensive Inventory Open Failed Error**
- **Cause**: Comprehensive inventory cannot be opened
- **Solution**: Verify sample is selected before opening comprehensive inventory
- **Prevention**: Ensure proper selection before opening

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Sample Access**: Access to sample viewing operations
- **Store Access**: Access to stores with sample data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Sample Workflow**: Understanding of sample viewing process
- **Store Management**: Knowledge of store selection and filtering
- **Sample Management**: Knowledge of sample selection and details viewing
- **Sample Management**: Familiarity with sample close and comprehensive inventory operations

## Usage Examples

### Basic Sample Viewing Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for sample filtering
3. **Sample Review**: Review samples in sample grid
4. **Sample Selection**: Select specific sample for details
5. **Sample Details Review**: Review sample items in details grid
6. **Sample Close**: Close sample when complete
7. **Comprehensive Inventory Open**: Open comprehensive inventory for sample

### Sample Management Workflow

1. **Store Selection**: Select store for sample filtering
2. **Sample Review**: Review all samples for selected store
3. **Sample Selection**: Select sample for management
4. **Sample Details Review**: Review sample items with details
5. **Sample Close**: Close sample when complete
6. **Comprehensive Inventory Open**: Open comprehensive inventory for sample
7. **Sample Completion**: Complete all sample operations

### Multi-Sample Management

1. **Store Selection**: Select store for sample filtering
2. **Sample Review**: Review all samples for selected store
3. **Selective Viewing**: View details for specific samples
4. **Sample Comparison**: Compare samples across store
5. **Sample Management**: Manage samples as needed
6. **Sample Completion**: Complete all sample operations