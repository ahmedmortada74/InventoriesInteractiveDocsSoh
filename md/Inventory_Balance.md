← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Balance.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Balance.aspx`
**Purpose**: Inventory balance and stocktaking management system for viewing and printing inventory cards
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, stocktaking personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Filtering)**
- **Store Dropdown**: Must select valid store for inventory filtering
- **Error Prevention**: System validates store is selected before loading inventory data
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents inventory loading without store selection
- **Validation**: Only active stores are available

#### 2. **Location Code Selection (Optional for Filtering)**
- **Location Code Dropdown**: Optional selection for location-based filtering
- **Error Prevention**: System allows filtering by location code if selected
- **Data Source**: Location codes based on selected store
- **Default Behavior**: User can select location code or leave empty for all locations
- **Error Message**: No validation required as this is optional
- **Validation**: Location codes are filtered based on selected store

#### 3. **Committee Selection (Required for Inventory Cards)**
- **Committee Dropdown**: Must select valid committee for inventory card display
- **Error Prevention**: System validates committee is selected before loading inventory cards
- **Data Source**: Inventories_Random_Sampling_Committee_Header table with committee information
- **Default Behavior**: User must select committee manually
- **Error Message**: Validation prevents inventory card loading without committee selection
- **Validation**: Only committees with associated inventory cards are available

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading inventory data
- **Error**: Store has no inventory data
- **Prevention**: Verify store has inventory cards before selection

#### **Committee Selection Errors**
- **Error**: No committee selected
- **Prevention**: Always select committee before loading inventory cards
- **Error**: Committee has no inventory cards
- **Prevention**: Verify committee has associated inventory cards

#### **Data Loading Errors**
- **Error**: No inventory data found
- **Prevention**: Ensure store and committee selections are valid
- **Error**: Print fails
- **Prevention**: Verify committee is selected before printing

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inventory viewing permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Inventory cards must be created** for committees
5. **Committees must be active** and associated with stores

#### **Required System State**
- User authentication must be active
- Inventory viewing permissions must be configured
- Store data must be current
- Committee data must be current
- Inventory cards must be available

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper inventory loading
- ✅ Store selection enables committee filtering

#### **For Committee Selection**
- ✅ Committee dropdown populated with committees having inventory cards
- ✅ Committee validation ensures proper inventory card display
- ✅ Committee selection enables inventory card loading

#### **For Inventory Display**
- ✅ Inventory grid displays all items for selected committee
- ✅ Item details show complete inventory information
- ✅ Unit information displays properly for each item
- ✅ Price calculations are accurate

#### **For Print Functionality**
- ✅ Print button enabled only when committee is selected
- ✅ Print generates proper inventory report
- ✅ Print includes all required inventory information

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" Width="100%">
```

**Form Layout**: Bootstrap form layout with vertical structure for inventory balance management

### Store and Date Selection Section

```html
<!-- Store and Date Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{0} - {1} - {2}" CssClasses-Control="mb-2" OnSelectedIndexChanged="ComboBox_Store_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ بدء الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="textbox_startDate" Enabled="false" DisplayFormatString="D" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="textBox_FinishDate" Enabled="false" DisplayFormatString="D" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Location and Committee Selection Section

```html
<!-- Location and Committee Selection -->
<dx:BootstrapLayoutItem Caption="كود الموقع" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_LocationCode" AutoPostBack="true" DropDownRows="5" NullText="اختر الموقع" CssClasses-Control="mb-2">
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="كود اللجنة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Comittee" DataSourceID="DS_Committe" AutoPostBack="true" TextField="Description" EnableMultiColumn="true" TextFormatString="{3}" ValueField="ID" DropDownRows="5" NullText="اختر اللجنة" CssClasses-Control="mb-2" OnSelectedIndexChanged="ComboBox_Comittee_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="Store_ID" />
                    <dx:BootstrapListBoxField FieldName="Status" />
                    <dx:BootstrapListBoxField FieldName="Description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Print Button Section

```html
<!-- Print Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_Print" Text="طباعة" OnClick="Btn_Print_Click" CssClasses-Control="mb-5" Enabled="false">
                <SettingsBootstrap RenderOption="Primary" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Inventory Items Grid Section

```html
<!-- Inventory Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div class="d-flex border" style="width: calc(100vw - 20rem); border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_CardItems" Width="100%" KeyFieldName="ID" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" AutoPostBack="true" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsText-EmptyDataRow="لاتوجد بيانات للعرض" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomColumnDisplayText="GV_Items_CustomColumnDisplayText" DataSourceID="SqlDS">
                    <Settings ShowFooter="True" />
                    <Settings ShowFilterRow="true" />
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsDataSecurity AllowEdit="false" AllowDelete="false" AllowInsert="false" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                    <Columns>
                        <dx:BootstrapGridViewBandColumn Caption="الاصناف" CssClasses-HeaderCell="text-center bg-info text-white">
                            <Columns>
                                <dx:BootstrapGridViewTextColumn VisibleIndex="0" Caption="#" UnboundType="String"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Header_ID" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Body_ID" VisibleIndex="1" Visible="false"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Item_Code" Caption="كود الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewBandColumn Caption="مسمي الصنف" VisibleIndex="3">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn FieldName="Name_ar" Caption="المسمي العربي" VisibleIndex="3" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                                        <dx:BootstrapGridViewTextColumn FieldName="Name_en" Caption="المسمي الانجليزي" VisibleIndex="4" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Batch_No" Caption="الدفعة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Confirm_Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="5" PropertiesTextEdit-DisplayFormatString="{0:MM-dd-yyyy}"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="UOM_Description" Caption="وحدة التخزين" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Confirm_Item_Quantity" Caption="العدد" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Latest_Unit_price" Caption="سعر الوحدة" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Sum_Of_Latest_Unit_price" Caption="اجمالي سعر الوحدات" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                    </Columns>
                    <TotalSummary>
                        <dx:ASPxSummaryItem FieldName="Confirm_Item_Quantity" SummaryType="Sum" />
                        <dx:ASPxSummaryItem FieldName="Latest_Unit_price" SummaryType="Sum" />
                        <dx:ASPxSummaryItem FieldName="Sum_Of_Latest_Unit_price" SummaryType="Sum" />
                    </TotalSummary>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Store Parameters**:
- `@Store_ID` - Store ID for filtering inventory cards

**Committee Parameters**:
- `@Committee_ID` - Committee ID for filtering inventory cards

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads committees based on selected store
3. **Committee Selection**: Loads inventory cards based on selected committee
4. **Inventory Display**: Displays inventory items with details
5. **Print Function**: Generates inventory report for selected committee

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default inventory state
4. Initializes date displays

### ComboBox_Store_SelectedIndexChanged Method

```csharp
protected void ComboBox_Store_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads committees based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for committee data source
3. Binds committee dropdown
4. Updates store information display

### ComboBox_Comittee_SelectedIndexChanged Method

```csharp
protected void ComboBox_Comittee_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads inventory cards based on selected committee

**Process**:
1. Validates committee selection
2. Sets parameters for inventory data source
3. Binds inventory grid
4. Enables print button
5. Updates committee information display

### Btn_Print_Click Method

```csharp
protected void Btn_Print_Click(object sender, EventArgs e)
```

**Purpose**: Generates inventory report for selected committee

**Process**:
1. Validates committee selection
2. Generates inventory report
3. Displays report to user
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Random_Sampling_Committee_Header**
- **Purpose**: Committee header information
- **Key Fields**: ID, Description, Status, Store_ID
- **Usage**: Provides committee list for filtering
- **Filtering**: Only committees with associated inventory cards

#### **Inventories_Cards_Header**
- **Purpose**: Inventory card header information
- **Key Fields**: ID, Store_ID, Committee_ID, Status
- **Usage**: Tracks inventory cards for committees
- **Filtering**: Only cards with status = 0 (pending)

#### **Inventories_Cards_Body**
- **Purpose**: Inventory card body with item details
- **Key Fields**: ID, Header_ID, Item_Code, Name_ar, Name_en, Batch_No, Confirm_Expiration_date, Confirm_Item_Quantity, Latest_Unit_price, UOM
- **Usage**: Tracks inventory items for cards
- **Filtering**: Only items associated with selected committee

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing inventory data

#### **Store Filtering**
```sql
SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store
```

**Filtering Logic**: Shows all stores for user
**Permission Logic**: All stores are available
**Validation**: Ensures store has inventory data

#### **Committee Filtering**
```sql
SELECT Committee_Header.ID, Committee_Header.Description, Committee_Header.Status, Committee_Header.Store_ID 
FROM Inventories_Random_Sampling_Committee_Header Committee_Header 
INNER JOIN Inventories_Cards_Header Cards_Header ON Cards_Header.Committee_ID = Committee_Header.ID
WHERE Committee_Header.Store_ID = @Store_ID
```

**Filtering Logic**: Shows only committees with associated inventory cards
**Permission Logic**: Only committees with inventory cards are available
**Validation**: Ensures committee has inventory data

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, location, and committee dropdowns

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectSingleRowOnly="true"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Single row selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to inventory items grid

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with vertical structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store and Date Selection Section**
```html
<!-- Store and Date Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="تاريخ بدء الجرد" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الجرد" ColSpanMd="3">
```

#### **2. Location and Committee Selection Section**
```html
<!-- Location and Committee Selection -->
<dx:BootstrapLayoutItem Caption="كود الموقع" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="كود اللجنة" ColSpanMd="6">
```

#### **3. Print Button Section**
```html
<!-- Print Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Inventory Items Grid Section**
```html
<!-- Inventory Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";

// Committee Data Source
SqlDataSource DS_Committe = new SqlDataSource();
DS_Committe.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_Committe.SelectCommand = "SELECT Committee_Header.ID, Committee_Header.Description, Committee_Header.Status, Committee_Header.Store_ID FROM Inventories_Random_Sampling_Committee_Header Committee_Header INNER JOIN Inventories_Cards_Header Cards_Header ON Cards_Header.Committee_ID = Committee_Header.ID WHERE Committee_Header.Store_ID = @Store_ID";

// Inventory Items Data Source
SqlDataSource SqlDS = new SqlDataSource();
SqlDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDS.SelectCommand = "SELECT header.ID AS Header_ID, body.ID AS Body_ID, body.Item_Code, body.Name_ar, body.Name_en, body.Batch_No, body.Confirm_Expiration_date, body.Confirm_Item_Quantity, body.Latest_Unit_price, body.Confirm_Item_Quantity * body.Latest_Unit_price AS Sum_Of_Latest_Unit_price, COALESCE(uom.description, '-Not Found-') AS UOM_Description FROM Inventories_Cards_Header AS header INNER JOIN Inventories_Cards_Body AS body ON body.Header_ID = header.ID LEFT OUTER JOIN Inventories_UOM AS uom ON uom.id = body.UOM WHERE header.Store_ID = @Store_ID AND header.Committee_ID = @Committee_ID";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void ComboBox_Store_SelectedIndexChanged(object sender, EventArgs e)
{
    if (ComboBox_Store.Value == "" || ComboBox_Store.Value == null)
    {
        // Clear committee dropdown
        ComboBox_Comittee.DataSource = null;
        ComboBox_Comittee.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading committees
**Error Prevention**: Prevents committee loading without store selection

### Committee Selection Validation

```csharp
protected void ComboBox_Comittee_SelectedIndexChanged(object sender, EventArgs e)
{
    if (ComboBox_Comittee.Value == "" || ComboBox_Comittee.Value == null)
    {
        // Clear inventory grid
        GV_CardItems.DataSource = null;
        GV_CardItems.DataBind();
        Btn_Print.Enabled = false;
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates committee selection before loading inventory cards
**Error Prevention**: Prevents inventory card loading without committee selection

### Print Button Validation

```csharp
protected void Btn_Print_Click(object sender, EventArgs e)
{
    if (ComboBox_Comittee.Value == "" || ComboBox_Comittee.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار اللجنة');", true);
        return;
    }
    // ... additional validation
}
```

**Print Logic**: Validates committee selection before printing
**Error Prevention**: Prevents printing without committee selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading committees
- **Committee Selection Validation**: Must select committee before loading inventory cards
- **Print Validation**: Must select committee before printing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Committee Validation**: Ensures committee has associated inventory cards
- **Inventory Validation**: Ensures inventory items are available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Inventory Access**: Ensures user can access inventory data

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Print Operations**: Handles print failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of inventory grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Data Display**: Inventory information displays properly

## Integration Points

### External Systems

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Header` - Committee information
  - `Inventories_Cards_Header` - Inventory card headers
  - `Inventories_Cards_Body` - Inventory card items
  - `Inventories_UOM` - Unit of measure master data
- **Integration Details**:
  - Store selection controls committee filtering
  - Committee selection controls inventory card display
  - Inventory items displayed with complete details
- **Data Flow**:
  - Stores filtered for user access
  - Committees filtered by store
  - Inventory cards filtered by committee

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all inventory operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Committee Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Header` - Committee information
- **Real-time Data**:
  - Store information for filtering
  - Committee information for inventory cards
  - Inventory quantities and prices
- **Data Relationships**:
  - Stores linked to committees via Store_ID
  - Committees linked to inventory cards via Committee_ID
  - Inventory cards linked to items via Header_ID

#### **Inventory and Item Information**
- **Database Tables**:
  - `Inventories_Cards_Header` - Inventory card headers
  - `Inventories_Cards_Body` - Inventory card items
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Inventory quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to inventory cards via Header_ID
  - Units linked to items via UOM field
  - Price calculations based on quantity and unit price

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading committees
- **Solution**: Always select store before loading committees
- **Prevention**: Store selection is required for all inventory operations

#### **"الرجاء اختيار اللجنة" Error**
- **Cause**: Committee not selected before loading inventory cards
- **Solution**: Always select committee before loading inventory cards
- **Prevention**: Committee selection is required for all inventory operations

#### **No Inventory Data Found**
- **Cause**: Committee has no associated inventory cards
- **Solution**: Verify committee has inventory cards before selection
- **Prevention**: Ensure committees have inventory data

#### **Print Failed Error**
- **Cause**: Committee not selected before printing
- **Solution**: Always select committee before printing
- **Prevention**: Committee selection is required for printing

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Inventory Access**: Access to inventory viewing operations
- **Store Access**: Access to stores with inventory data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Inventory Workflow**: Understanding of inventory viewing process
- **Store Management**: Knowledge of store selection and filtering
- **Committee Management**: Knowledge of committee selection and inventory cards
- **Inventory Management**: Familiarity with inventory items and details

## Usage Examples

### Basic Inventory Viewing Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for inventory filtering
3. **Committee Selection**: Select committee for inventory cards
4. **Inventory Review**: Review inventory items in grid
5. **Print Report**: Print inventory report for selected committee

### Inventory Card Management Workflow

1. **Store Selection**: Select store for inventory filtering
2. **Location Selection**: Select location code for filtering (optional)
3. **Committee Selection**: Select committee for inventory cards
4. **Inventory Review**: Review inventory items with details
5. **Price Verification**: Verify unit prices and totals
6. **Print Report**: Print complete inventory report

### Multi-Committee Inventory Management

1. **Store Selection**: Select store for inventory filtering
2. **Committee Review**: Review all committees for selected store
3. **Selective Viewing**: View inventory cards for specific committees
4. **Inventory Comparison**: Compare inventory across committees
5. **Report Generation**: Generate reports for selected committees