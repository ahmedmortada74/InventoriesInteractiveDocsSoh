← Go back to 
[Inventories Module Documentation](/Inventories)


# Retrieve_Inventory_Restriction.aspx

## Overview

**File**: `\Inventories\Process\Retrieve_Inventory_Restriction.aspx`
**Purpose**: Inventory restriction retrieval system for viewing and managing inventory restrictions
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, financial accountants, restriction managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Financial Year Selection (Required for Data Loading)**
- **Financial Year Dropdown**: Must select valid financial year for data loading
- **Error Prevention**: System validates financial year is selected before loading restrictions
- **Data Source**: Inventories_Stock_Years table with financial year information
- **Default Behavior**: User must select financial year manually
- **Error Message**: Validation prevents restriction loading without financial year selection
- **Validation**: Only active financial years are available

#### 2. **Restriction Document Selection (Required for Viewing)**
- **Restriction Document Dropdown**: Must select valid restriction document for viewing
- **Error Prevention**: System validates restriction document is selected before loading details
- **Data Source**: Inventories_Stock table with restriction document information
- **Default Behavior**: User must select restriction document manually
- **Error Message**: Validation prevents details loading without restriction document selection
- **Validation**: Only restriction documents with available data are available

#### 3. **Search Action (Required for Data Retrieval)**
- **Search Button**: Must click search button to retrieve restriction data
- **Error Prevention**: System validates search action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click search button manually
- **Error Message**: Validation prevents data retrieval without search action
- **Validation**: Search action must be explicitly selected

#### 4. **Document Viewing (Required for Document Access)**
- **View Document Button**: Must click view button to access document details
- **Error Prevention**: System validates view action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click view button manually
- **Error Message**: Validation prevents document viewing without view action
- **Validation**: View action must be explicitly selected

### Common Error Scenarios and Prevention

#### **Financial Year Selection Errors**
- **Error**: No financial year selected
- **Prevention**: Always select financial year before loading restrictions
- **Error**: Financial year has no restrictions
- **Prevention**: Verify financial year has restrictions before selection

#### **Restriction Document Selection Errors**
- **Error**: No restriction document selected
- **Prevention**: Always select restriction document before loading details
- **Error**: Restriction document has no data
- **Prevention**: Verify restriction document has data before selection

#### **Search Errors**
- **Error**: Search fails
- **Prevention**: Ensure financial year is selected before search
- **Error**: No data found
- **Prevention**: Verify financial year has restrictions before search

#### **Document Viewing Errors**
- **Error**: Document viewing fails
- **Prevention**: Ensure restriction document is selected before viewing
- **Error**: Document not accessible
- **Prevention**: Verify document is accessible before viewing

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have viewing permissions** via employee group assignments
3. **Financial years must be configured** in the system
4. **Restriction documents must be available** in the system
5. **Inventory data must be current** in the system

#### **Required System State**
- User authentication must be active
- Viewing permissions must be configured
- Financial year data must be current
- Restriction document data must be available
- Inventory data must be current

### Success Criteria

#### **For Financial Year Selection**
- ✅ Financial year dropdown populated with active years only
- ✅ Financial year validation ensures proper restriction loading
- ✅ Financial year selection enables restriction filtering

#### **For Restriction Document Selection**
- ✅ Restriction document dropdown populated with available documents only
- ✅ Restriction document validation ensures proper details loading
- ✅ Restriction document selection enables details display

#### **For Search Management**
- ✅ Search creates proper data retrieval
- ✅ Financial year selection enables search workflow
- ✅ Search workflow works with proper validation
- ✅ Search completion provides success feedback

#### **For Document Viewing Management**
- ✅ Document viewing creates proper document access
- ✅ Restriction document selection enables viewing workflow
- ✅ Viewing workflow works with proper validation
- ✅ Viewing completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for inventory restriction retrieval

### Financial Year Selection Section

```html
<!-- Financial Year Selection -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="dcyear" runat="server" AutoPostBack="true" Caption="السنة المالية" TextFormatString="{0}" EnableMultiColumn="true" CallbackPageSize="15" CssClasses-Caption="font-weight-bold w-15" CssClasses-Control="d-flex w-100 ml-4" EnableCallbackMode="false" DataSourceID="adoyear" ValueField="Stock_Table_Name" TextField="Stock_Year" OnSelectedIndexChanged="dcyear_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="Stock_Year" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Restriction Document Selection Section

```html
<!-- Restriction Document Selection -->
<dx:BootstrapLayoutItem Caption="رقم مستند القيد" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="RestrictionFile" DropDownStyle="DropDownList" TextField="restriction_Number" ValueField="ID" EnableCallbackMode="false">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="restriction_Number" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Search Button Section

```html
<!-- Search Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btnSearch" runat="server" Text="بحث" Width="15%" OnClick="btnSearch_Click">
                <SettingsBootstrap RenderOption="Info" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Restriction Details Grid Section

```html
<!-- Restriction Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="grdDetails" AutoPostBack="true" KeyFieldName="NUM" EnableCallBacks="false" Width="100%" AutoGenerateColumns="False" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomButtonCallback="grdDetails_CustomButtonCallback">
                <SettingsBehavior AllowSelectByRowClick="false" />
                <Settings VerticalScrollBarMode="Auto" VerticalScrollableHeight="300" ShowGroupPanel="true" />
                <Columns>
                    <dx:BootstrapGridViewDataColumn FieldName="NUM" Caption="مسلسل" />
                    <dx:BootstrapGridViewDataColumn FieldName="StockDate" Caption="تاريخ الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="MoveType" Caption="كود الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="Arabic_Name" Caption="اسم الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="storeid" Caption="كود المخزن" />
                    <dx:BootstrapGridViewDataColumn FieldName="doc_id" Caption="رقم مستند الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="totalPrice" Caption="قيمة الحركة" />
                    <dx:BootstrapGridViewDataColumn FieldName="restriction_Number" Caption="رقم القيد للحركة" />
                    <dx:BootstrapGridViewCommandColumn Caption="عرض مستند الحركة">
                        <CustomButtons>
                            <dx:BootstrapGridViewCommandColumnCustomButton ID="Show" Text="عرض المستند" CssClass="fontColor" />
                        </CustomButtons>
                    </dx:BootstrapGridViewCommandColumn>
                </Columns>
                <SettingsPager Mode="EndlessPaging" AlwaysShowPager="false" Visible="false">
                    <PageSizeItemSettings ShowAllItem="True" />
                </SettingsPager>
                <SettingsDataSecurity AllowEdit="False" AllowInsert="False" AllowDelete="False"></SettingsDataSecurity>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Print and Reverse Section

```html
<!-- Print and Reverse -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" Text="طباعة بيان الاجمالى" AutoPostBack="true" ID="PrintTotalMove" OnClick="PrintTotalMove_Click">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" Text="طباعة بيان التفصيلى" AutoPostBack="true" ID="PrintEachMove" OnClick="PrintEachMove_Click">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" Text="الغاء القيد" AutoPostBack="true" ID="Reverse" OnClick="Reverse_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Document Viewing Popup Section

```html
<!-- Document Viewing Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="POPUP" SettingsBootstrap-Sizing="Large" Width="1200" ShowCloseButton="true" Modal="true" HeaderText="Alert" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" AllowResize="true" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <div style="width: 100%; height: 100%" class="container">
                            <iframe id="iframreport" style="width: 100%; height: 100vh;" runat="server" class="pl-2 d-flex flex-grow-1 min-width-zero"></iframe>
                        </div>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Report Printing Popup Section

```html
<!-- Report Printing Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="POPUP2" SettingsBootstrap-Sizing="Large" Width="1200" ShowCloseButton="true" Modal="true" HeaderText="تقرير" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" AllowResize="true" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <div style="width: 100%; height: 100%" class="container">
                            <iframe id="iframreport2" style="width: 100%; height: 100vh;" runat="server" class="pl-2 d-flex flex-grow-1 min-width-zero"></iframe>
                        </div>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Reverse Confirmation Popup Section

```html
<!-- Reverse Confirmation Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="POPUP3" SettingsBootstrap-Sizing="Large" Width="1200" ShowCloseButton="true" Modal="true" HeaderText="تقرير" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" AllowResize="true" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <div style="width: 100%; height: 100%" class="container">
                            <iframe id="iframreport3" style="width: 100%; height: 100vh;" runat="server" class="pl-2 d-flex flex-grow-1 min-width-zero"></iframe>
                        </div>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Financial Year Parameters**:
- `@Stock_Table_Name` - Financial year table name for filtering restrictions

**Restriction Parameters**:
- `@restriction_Number` - Restriction number for filtering details

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Financial Year Selection**: Loads restrictions based on selected financial year
3. **Restriction Document Selection**: Loads details based on selected restriction document
4. **Search**: Retrieves restriction data based on selected criteria
5. **Document Viewing**: Opens document details in popup
6. **Report Printing**: Opens report in popup
7. **Reverse**: Processes restriction reversal

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads financial year information
3. Sets default restriction state
4. Initializes date displays

### dcyear_SelectedIndexChanged Method

```csharp
protected void dcyear_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads restrictions based on selected financial year

**Process**:
1. Validates financial year selection
2. Sets parameters for restriction data source
3. Binds restriction document dropdown
4. Updates financial year information display

### btnSearch_Click Method

```csharp
protected void btnSearch_Click(object sender, EventArgs e)
```

**Purpose**: Searches for restriction data based on selected criteria

**Process**:
1. Validates financial year selection
2. Validates restriction document selection
3. Retrieves restriction data
4. Binds restriction details grid
5. Provides success feedback

### grdDetails_CustomButtonCallback Method

```csharp
protected void grdDetails_CustomButtonCallback(object sender, DevExpress.Web.Bootstrap.BootstrapGridViewCustomButtonCallbackEventArgs e)
```

**Purpose**: Opens document details in popup

**Process**:
1. Validates document selection
2. Opens document in popup
3. Provides success feedback

### PrintTotalMove_Click Method

```csharp
protected void PrintTotalMove_Click(object sender, EventArgs e)
```

**Purpose**: Prints total movement report

**Process**:
1. Validates financial year selection
2. Generates total movement report
3. Opens report in popup
4. Provides success feedback

### PrintEachMove_Click Method

```csharp
protected void PrintEachMove_Click(object sender, EventArgs e)
```

**Purpose**: Prints detailed movement report

**Process**:
1. Validates financial year selection
2. Generates detailed movement report
3. Opens report in popup
4. Provides success feedback

### Reverse_Click Method

```csharp
protected void Reverse_Click(object sender, EventArgs e)
```

**Purpose**: Reverses selected restriction

**Process**:
1. Validates restriction selection
2. Validates reversal permissions
3. Updates restriction status to reversed
4. Refreshes restriction details grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Stock_Years**
- **Purpose**: Financial year master data
- **Key Fields**: Stock_Year, Stock_Table_Name, active
- **Usage**: Provides financial year list for filtering
- **Filtering**: Only active financial years

#### **Inventories_Stock**
- **Purpose**: Stock records with restriction information
- **Key Fields**: NUM, StockDate, MoveType, Arabic_Name, storeid, doc_id, totalPrice, restriction_Number
- **Usage**: Tracks restriction information for viewing
- **Filtering**: Only restrictions with available data

#### **Inventories_Stock_2024**
- **Purpose**: Stock records for specific financial year
- **Key Fields**: NUM, StockDate, MoveType, Arabic_Name, storeid, doc_id, totalPrice, restriction_Number
- **Usage**: Tracks restriction information for specific financial year
- **Filtering**: Only restrictions for selected financial year

#### **Orman.dbo.JEHead**
- **Purpose**: Journal entry header information
- **Key Fields**: ID, AccountQCode
- **Usage**: Links restrictions to journal entries
- **Filtering**: Only journal entries with restriction numbers

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing restriction data

#### **Financial Year Filtering**
```sql
select Inventories_Stock_Years.Stock_Year, Stock_Table_Name 
from Inventories_Stock_Years 
where active=1
```

**Filtering Logic**: Shows only active financial years
**Permission Logic**: Only active financial years are available
**Validation**: Ensures financial year has restrictions

#### **Restriction Document Filtering**
```sql
select distinct ss.restriction_Number, jh.ID 
from Inventories_Stock ss 
inner join Orman.dbo.JEHead jh on jh.AccountQCode=ss.restriction_Number
```

**Filtering Logic**: Shows only restriction documents with journal entries
**Permission Logic**: Only restriction documents with journal entries are available
**Validation**: Ensures restriction document has data

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to financial year and restriction document dropdowns

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

#### **1. Financial Year Selection Section**
```html
<!-- Financial Year Selection -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
```

#### **2. Restriction Document Selection Section**
```html
<!-- Restriction Document Selection -->
<dx:BootstrapLayoutItem Caption="رقم مستند القيد" ColSpanMd="6">
```

#### **3. Search Button Section**
```html
<!-- Search Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Restriction Details Grid Section**
```html
<!-- Restriction Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **5. Print and Reverse Section**
```html
<!-- Print and Reverse -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **6. Document Viewing Popup Section**
```html
<!-- Document Viewing Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

#### **7. Report Printing Popup Section**
```html
<!-- Report Printing Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

#### **8. Reverse Confirmation Popup Section**
```html
<!-- Reverse Confirmation Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Financial Year Data Source
SqlDataSource adoyear = new SqlDataSource();
adoyear.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
adoyear.SelectCommand = "select Inventories_Stock_Years.Stock_Year, Stock_Table_Name from Inventories_Stock_Years where active=1";

// Restriction Document Data Source
SqlDataSource RestrictionDS = new SqlDataSource();
RestrictionDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RestrictionDS.SelectCommand = "select distinct ss.restriction_Number, jh.ID from Inventories_Stock ss inner join Orman.dbo.JEHead jh on jh.AccountQCode=ss.restriction_Number";

// Restriction Document Data Source (2024)
SqlDataSource RestrictionDS2 = new SqlDataSource();
RestrictionDS2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RestrictionDS2.SelectCommand = "select distinct ss.restriction_Number, jh.ID from Inventories_Stock_2024 ss inner join Orman.dbo.JEHead jh on jh.AccountQCode=ss.restriction_Number";
```

## Business Logic and Validation

### Financial Year Selection Validation

```csharp
protected void dcyear_SelectedIndexChanged(object sender, EventArgs e)
{
    if (dcyear.Value == "" || dcyear.Value == null)
    {
        // Clear restriction document dropdown
        RestrictionFile.DataSource = null;
        RestrictionFile.DataBind();
        return;
    }
    // ... additional validation
}
```

**Financial Year Logic**: Validates financial year selection before loading restrictions
**Error Prevention**: Prevents restriction loading without financial year selection

### Restriction Document Selection Validation

```csharp
protected void RestrictionFile_SelectedIndexChanged(object sender, EventArgs e)
{
    if (RestrictionFile.Value == "" || RestrictionFile.Value == null)
    {
        // Clear restriction details grid
        grdDetails.DataSource = null;
        grdDetails.DataBind();
        return;
    }
    // ... additional validation
}
```

**Restriction Document Logic**: Validates restriction document selection before loading details
**Error Prevention**: Prevents details loading without restriction document selection

### Search Validation

```csharp
protected void btnSearch_Click(object sender, EventArgs e)
{
    if (dcyear.Value == "" || dcyear.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السنة المالية');", true);
        return;
    }
    // ... additional validation
}
```

**Search Logic**: Validates financial year selection before search
**Error Prevention**: Prevents search without financial year selection

### Document Viewing Validation

```csharp
protected void grdDetails_CustomButtonCallback(object sender, DevExpress.Web.Bootstrap.BootstrapGridViewCustomButtonCallbackEventArgs e)
{
    if (e.ButtonID == "Show")
    {
        // Validate document selection
        // ... additional validation
    }
}
```

**Document Viewing Logic**: Validates document selection before viewing
**Error Prevention**: Prevents document viewing without document selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Financial Year Selection Validation**: Must select financial year before loading restrictions
- **Restriction Document Selection Validation**: Must select restriction document before loading details
- **Search Validation**: Must select financial year before search
- **Document Viewing Validation**: Must select document before viewing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Financial Year Validation**: Ensures financial year is active and available
- **Restriction Document Validation**: Ensures restriction document has data
- **Search Validation**: Ensures financial year has restrictions
- **Document Viewing Validation**: Ensures document is accessible

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Financial Year Access**: Ensures user has access to selected financial year
- **Viewing Access**: Ensures user can access and view restriction records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: "تم البحث" (Search completed successfully)
- **Document Viewing Success**: "تم عرض المستند" (Document viewed successfully)
- **Report Printing Success**: "تم طباعة التقرير" (Report printed successfully)
- **Reverse Success**: "تم الغاء القيد" (Restriction reversed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of restriction details grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Inventory Restriction Management System**
- **Database Tables**:
  - `Inventories_Stock_Years` - Financial year master data
  - `Inventories_Stock` - Stock records with restriction information
  - `Inventories_Stock_2024` - Stock records for specific financial year
  - `Orman.dbo.JEHead` - Journal entry header information
- **Integration Details**:
  - Financial year selection controls restriction filtering
  - Restriction document selection controls details display
  - Details displayed with complete information
  - Viewing/printing/reversal tracked with complete information
- **Data Flow**:
  - Financial years filtered for user access
  - Restrictions filtered by financial year
  - Details filtered by restriction document
  - Viewing/printing/reversal tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all viewing operations
  - Financial year access controlled by user permissions

### Data Exchange

#### **Financial Year and Restriction Information**
- **Database Tables**:
  - `Inventories_Stock_Years` - Financial year master data
  - `Inventories_Stock` - Stock records with restriction information
- **Real-time Data**:
  - Financial year information for filtering
  - Restriction information for viewing
  - Details information and calculations
- **Data Relationships**:
  - Financial years linked to restrictions via Stock_Table_Name
  - Restrictions linked to details via restriction_Number
  - Viewing/printing/reversal tracked by user

#### **Restriction and Details Information**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with restriction information
  - `Orman.dbo.JEHead` - Journal entry header information
- **Real-time Data**:
  - Restriction details and descriptions
  - Viewing quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Restrictions linked to details via restriction_Number
  - Details linked to journal entries via AccountQCode
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار السنة المالية" Error**
- **Cause**: Financial year not selected before loading restrictions
- **Solution**: Always select financial year before loading restrictions
- **Prevention**: Financial year selection is required for all viewing operations

#### **"الرجاء اختيار رقم مستند القيد" Error**
- **Cause**: Restriction document not selected before loading details
- **Solution**: Always select restriction document before loading details
- **Prevention**: Restriction document selection is required for all viewing operations

#### **No Restrictions Found**
- **Cause**: No restrictions available for selected financial year
- **Solution**: Verify financial year has restrictions before selection
- **Prevention**: Ensure financial years have restrictions

#### **Search Failed Error**
- **Cause**: Search cannot be processed
- **Solution**: Verify financial year is selected before search
- **Prevention**: Ensure proper validation before search

#### **Document Viewing Failed Error**
- **Cause**: Document cannot be viewed
- **Solution**: Verify restriction document is selected before viewing
- **Prevention**: Ensure proper validation before viewing

#### **Report Printing Failed Error**
- **Cause**: Report cannot be printed
- **Solution**: Verify financial year is selected before printing
- **Prevention**: Ensure proper validation before printing

#### **Reverse Failed Error**
- **Cause**: Restriction cannot be reversed
- **Solution**: Verify restriction is selected before reversal
- **Prevention**: Ensure proper validation before reversal

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Viewing Access**: Access to viewing operations
- **Financial Year Access**: Access to financial years with restrictions

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Viewing Workflow**: Understanding of viewing process
- **Financial Year Management**: Knowledge of financial year selection and filtering
- **Restriction Management**: Knowledge of restriction selection and details
- **Viewing Management**: Familiarity with viewing save and reversal operations

## Usage Examples

### Basic Viewing Workflow

1. **Page Load**: Verify page loads with default data
2. **Financial Year Selection**: Select financial year for restriction filtering
3. **Restriction Document Selection**: Select restriction document for viewing
4. **Search**: Click search button to retrieve restriction data
5. **Document Review**: Review restriction details in grid
6. **Document Viewing**: Click view button to access document details
7. **Report Printing**: Click print button to print reports
8. **Reverse**: Click reverse button to reverse restrictions

### Report Printing Workflow

1. **Financial Year Selection**: Select financial year for report filtering
2. **Restriction Document Selection**: Select restriction document for report
3. **Search**: Click search button to retrieve restriction data
4. **Total Report Printing**: Click print button for total movement report
5. **Detailed Report Printing**: Click print button for detailed movement report
6. **Report Viewing**: View reports in popup

### Reverse Workflow

1. **Financial Year Selection**: Select financial year for restriction filtering
2. **Restriction Document Selection**: Select restriction document for reversal
3. **Search**: Click search button to retrieve restriction data
4. **Restriction Selection**: Select restriction for reversal
5. **Reverse**: Click reverse button to reverse restriction
6. **Completion**: Complete restriction reversal operations