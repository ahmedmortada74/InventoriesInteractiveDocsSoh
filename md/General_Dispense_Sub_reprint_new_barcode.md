← Go back to 
[Inventories Module Documentation](/Inventories)


# General_Dispense_Sub_reprint_new_barcode.aspx

## Overview

**File**: `\Inventories\Process\General_Dispense_Sub_reprint_new_barcode.aspx`
**Purpose**: Barcode reprinting system for dispensed inventory items with patient and date filtering
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacy staff, inventory administrators, printing personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Patient Selection (Required for Filtering)**
- **Patient Dropdown**: Must select valid patient for filtering dispensed items
- **Error Prevention**: System validates patient is selected before loading items
- **Data Source**: Patient_information table with patient information
- **Default Behavior**: User must select patient manually
- **Error Message**: Validation prevents item loading without patient selection
- **Validation**: Only active patients are available

#### 2. **Date Range Selection (Required for Filtering)**
- **From Date Field**: Must enter valid from date for filtering
- **To Date Field**: Must enter valid to date for filtering
- **Error Prevention**: System validates date range is entered before loading items
- **Data Source**: User input with date validation
- **Default Behavior**: User must enter date range manually
- **Error Message**: Validation prevents item loading without date range
- **Validation**: Date range must be valid and reasonable

#### 3. **Printer Selection (Required for Printing)**
- **Printer Dropdown**: Must select valid printer for printing
- **Error Prevention**: System validates printer is selected before printing
- **Data Source**: inventories_setup_pharm_barcode_printer table with printer information
- **Default Behavior**: User must select printer manually
- **Error Message**: Validation prevents printing without printer selection
- **Validation**: Only configured printers are available

#### 4. **Item Selection (Required for Printing)**
- **Item Grid Selection**: Must select valid item from dispensed items
- **Error Prevention**: System validates item is selected before printing
- **Data Source**: Inventories_Stock table with dispensed item information
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents printing without item selection
- **Validation**: Only items with available barcodes are available

### Common Error Scenarios and Prevention

#### **Patient Selection Errors**
- **Error**: No patient selected
- **Prevention**: Always select patient before loading items
- **Error**: Patient has no dispensed items
- **Prevention**: Verify patient has dispensed items before selection

#### **Date Range Errors**
- **Error**: No date range entered
- **Prevention**: Always enter date range before loading items
- **Error**: Invalid date range
- **Prevention**: Always enter valid date range values

#### **Printer Selection Errors**
- **Error**: No printer selected
- **Prevention**: Always select printer before printing
- **Error**: Printer not available
- **Prevention**: Verify printer is available before selection

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before printing
- **Error**: Item has no barcode
- **Prevention**: Verify item has barcode before selection

#### **Printing Management Errors**
- **Error**: Printing fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Printer not responding
- **Prevention**: Verify printer is available before printing

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have printing permissions** via employee group assignments
3. **Patients must be configured** in the system
4. **Dispensed items must be available** for reprinting
5. **Printers must be configured** in the system
6. **Barcode workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Printing permissions must be configured
- Patient data must be current
- Dispensed item data must be available
- Printer configuration must be current
- Barcode workflow must be enabled

### Success Criteria

#### **For Patient Selection**
- ✅ Patient dropdown populated with active patients only
- ✅ Patient validation ensures proper item loading
- ✅ Patient selection enables item filtering

#### **For Date Range Selection**
- ✅ Date range fields accept valid date input
- ✅ Date range validation ensures proper item loading
- ✅ Date range values are valid and reasonable

#### **For Printer Selection**
- ✅ Printer dropdown populated with configured printers only
- ✅ Printer validation ensures proper printing
- ✅ Printer selection enables printing workflow

#### **For Item Selection**
- ✅ Item grid displays all items for selected patient and date range
- ✅ Item details show complete dispensed information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Printing Management**
- ✅ Printing creates proper barcode labels
- ✅ Item selection enables printing workflow
- ✅ Printing workflow works with proper validation
- ✅ Printing completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for barcode reprinting

### Patient and Date Range Selection Section

```html
<!-- Patient and Date Range Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
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
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex; justify-content:space-between">
                        <dx:BootstrapDateEdit runat="server" ID="from" AutoPostBack="false" Caption="من" Width="45%"></dx:BootstrapDateEdit>
                        <dx:BootstrapDateEdit runat="server" ID="to" AutoPostBack="false" Caption="إلى" Width="45%"></dx:BootstrapDateEdit>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="false" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الطابعة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" ID="bar_code_printer_IP" DataSourceID="SqlDataSource1" AutoPostBack="false" TextField="printer_path" ValueField="printer_path"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn2" Width="100%" Text="بحث" OnClick="search_Click">
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Dispensed Items Grid Section

```html
<!-- Dispensed Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="ID" DataSourceID="RequstItemsDS" OnSelectionChanged="RequesrItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Count" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="ActiveCode"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Act_ingr"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Order_type" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Duration"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dur_unit"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="AdministrationInstructions"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dose"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Dose_unit"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Route"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="StockDate" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="doc_id"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="StoreID" Caption="Store ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="FK_order_no" Visible="true"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Trans_ID"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <ClientSideEvents SelectionChanged="OnSelectionChanged" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Print Button Section

```html
<!-- Print Button -->
<dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="_reprint_btn" runat="server" ClientInstanceName="btn2" Width="100%" Text="طباعة" OnClick="_reprint_btn_Click">
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Print Popup Section

```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print_pop" runat="server" CloseAction="CloseButton" style="top:0 !important;" ClientInstanceName="popupMessage" CloseAnimationType="Auto" PopupElementCssSelector="#default-popup-control-5" CloseOnEscape="True" HeaderText="print" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="1200px">
    <ContentCollection>
        <dx:ContentControl>
            <rsweb:ReportViewer ID="ReportViewer1" KeepSessionAlive="true" runat="server" Height="800px" Width="100%" Visible="true">
            </rsweb:ReportViewer>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Patient Parameters**:
- `@file` - Patient file ID for filtering items

**Date Parameters**:
- `@from` - From date for filtering items
- `@to` - To date for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Patient Selection**: Loads items based on selected patient
3. **Date Range Selection**: Loads items based on selected date range
4. **Item Selection**: Loads item information for selected item
5. **Printer Selection**: Loads printer information for printing
6. **Printing**: Generates barcode labels for selected items

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads patient information
3. Sets default printing state
4. Initializes date displays

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Searches for dispensed items based on selected criteria

**Process**:
1. Validates patient selection
2. Validates date range
3. Sets parameters for item data source
4. Binds item grid
5. Updates patient information display

### _reprint_btn_Click Method

```csharp
protected void _reprint_btn_Click(object sender, EventArgs e)
```

**Purpose**: Generates barcode labels for selected items

**Process**:
1. Validates all required fields are filled
2. Validates item selection
3. Validates printer selection
4. Generates barcode labels
5. Displays labels in popup
6. Provides success feedback

### RequesrItems_SelectionChanged Method

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Handles item selection changes

**Process**:
1. Validates item selection
2. Updates item information display
3. Enables printing workflow
4. Provides selection feedback

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Patient_information**
- **Purpose**: Patient master data
- **Key Fields**: FileId, Patient_Name
- **Usage**: Provides patient list for filtering
- **Filtering**: Only active patients

#### **Inventories_Stock**
- **Purpose**: Stock records with dispensed item information
- **Key Fields**: ID, Count_Lable, ActiveCode, Category, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, StockDate, doc_id, StoreID, FK_order_no, dispense_fileID
- **Usage**: Tracks dispensed item information for reprinting
- **Filtering**: Only items with FK_order_no not null

#### **DefinitionEffectiveMaterial**
- **Purpose**: Effective material master data
- **Key Fields**: Typ_ID, Typ_Name
- **Usage**: Provides active ingredient information for items

#### **inventories_setup_pharm_barcode_printer**
- **Purpose**: Barcode printer configuration
- **Key Fields**: printer_path
- **Usage**: Provides printer list for printing
- **Filtering**: Only configured printers

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing printing data

#### **Patient Filtering**
```sql
select distinct Patient_information.FileId, Patient_information.Patient_Name 
from Patient_information
```

**Filtering Logic**: Shows all patients for user
**Permission Logic**: All patients are available
**Validation**: Ensures patient has dispensed items

#### **Item Filtering**
```sql
select ID, Count_Lable as Count, ActiveCode, DefinitionEffectiveMaterial.Typ_Name as [Act_ingr], Category as [Order_type], Duration_no as [Duration], Duration_unit as [Dur_unit], Administration_Instructions as [AdministrationInstructions], Dose_After as [Dose], dose_unit as [Dose_unit], Dose as [Route], StockDate, doc_id, StoreID, Inventories_Stock.FK_order_no, Inventories_Stock.ID as [Trans_ID] 
from Inventories_Stock 
inner join Orman.dbo.DefinitionEffectiveMaterial on DefinitionEffectiveMaterial.Typ_ID=Inventories_Stock.ActiveCode 
where FK_order_no is not null and dispense_fileID=@file and StockDate between @from and @to 
order by FK_order_no
```

**Filtering Logic**: Shows only items with FK_order_no not null
**Permission Logic**: Only items with FK_order_no are available
**Validation**: Ensures item has available barcode

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to patient and printer dropdowns

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("جارى التحميل...");
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
- **Form Layout**: BootstrapFormLayout with vertical structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Patient and Date Range Selection Section**
```html
<!-- Patient and Date Range Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الطابعة" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Dispensed Items Grid Section**
```html
<!-- Dispensed Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **3. Print Button Section**
```html
<!-- Print Button -->
<dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

#### **4. Print Popup Section**
```html
<!-- Print Popup -->
<dx:BootstrapPopupControl ID="print_pop" runat="server">
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
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Emp_Code not in ('0','00')";

// Patient Data Source
SqlDataSource PatientDS = new SqlDataSource();
PatientDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
PatientDS.SelectCommand = "select distinct Patient_information.FileId, Patient_information.Patient_Name from Patient_information";

// Printer Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select DISTINCT printer_path from inventories_setup_pharm_barcode_printer";

// Dispensed Items Data Source
SqlDataSource RequstItemsDS = new SqlDataSource();
RequstItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequstItemsDS.SelectCommand = "select ID, Count_Lable as Count, ActiveCode, DefinitionEffectiveMaterial.Typ_Name as [Act_ingr], Category as [Order_type], Duration_no as [Duration], Duration_unit as [Dur_unit], Administration_Instructions as [AdministrationInstructions], Dose_After as [Dose], dose_unit as [Dose_unit], Dose as [Route], StockDate, doc_id, StoreID, Inventories_Stock.FK_order_no, Inventories_Stock.ID as [Trans_ID] from Inventories_Stock inner join Orman.dbo.DefinitionEffectiveMaterial on DefinitionEffectiveMaterial.Typ_ID=Inventories_Stock.ActiveCode where FK_order_no is not null and dispense_fileID=@file and StockDate between @from and @to order by FK_order_no";
```

## Business Logic and Validation

### Patient Selection Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (Patient.Value == "" || Patient.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الملف الطبي');", true);
        return;
    }
    // ... additional validation
}
```

**Patient Logic**: Validates patient selection before loading items
**Error Prevention**: Prevents item loading without patient selection

### Date Range Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (from.Value == null || to.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال التاريخ');", true);
        return;
    }
    // ... additional validation
}
```

**Date Range Logic**: Validates date range before loading items
**Error Prevention**: Prevents item loading without date range

### Printer Selection Validation

```csharp
protected void _reprint_btn_Click(object sender, EventArgs e)
{
    if (bar_code_printer_IP.Value == "" || bar_code_printer_IP.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الطابعة');", true);
        return;
    }
    // ... additional validation
}
```

**Printer Logic**: Validates printer selection before printing
**Error Prevention**: Prevents printing without printer selection

### Item Selection Validation

```csharp
protected void _reprint_btn_Click(object sender, EventArgs e)
{
    if (RequesrItems.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before printing
**Error Prevention**: Prevents printing without item selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Patient Selection Validation**: Must select patient before loading items
- **Date Range Validation**: Must enter date range before loading items
- **Printer Selection Validation**: Must select printer before printing
- **Item Selection Validation**: Must select item before printing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Patient Validation**: Ensures patient is active and available
- **Date Range Validation**: Ensures date range is valid and reasonable
- **Printer Validation**: Ensures printer is configured and available
- **Item Validation**: Ensures item has available barcode

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Patient Access**: Ensures user has access to selected patient
- **Printing Access**: Ensures user can access and modify printing records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Printing Success**: "تم طباعة الباركود" (Barcode printed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of item grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Barcode Printing Management System**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Patient_information` - Patient master data
  - `Inventories_Stock` - Stock records with dispensed item information
  - `DefinitionEffectiveMaterial` - Effective material master data
  - `inventories_setup_pharm_barcode_printer` - Barcode printer configuration
- **Integration Details**:
  - Patient selection controls item filtering
  - Date range selection controls item filtering
  - Item selection controls printing
  - Printing tracked with complete information
- **Data Flow**:
  - Patients filtered for user access
  - Items filtered by patient and date range
  - Printing tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all printing operations
  - Patient access controlled by user permissions

### Data Exchange

#### **Patient and Item Information**
- **Database Tables**:
  - `Patient_information` - Patient master data
  - `Inventories_Stock` - Stock records with dispensed item information
- **Real-time Data**:
  - Patient information for filtering
  - Item information for printing
  - Details information and calculations
- **Data Relationships**:
  - Patients linked to items via dispense_fileID
  - Items linked to printing via FK_order_no
  - Printing tracked by user

#### **Item and Printing Information**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with dispensed item information
  - `DefinitionEffectiveMaterial` - Effective material master data
  - `inventories_setup_pharm_barcode_printer` - Barcode printer configuration
- **Real-time Data**:
  - Item details and descriptions
  - Printing quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to printing via FK_order_no
  - Printing tracked by item
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار الملف الطبي" Error**
- **Cause**: Patient not selected before loading items
- **Solution**: Always select patient before loading items
- **Prevention**: Patient selection is required for all printing operations

#### **"الرجاء ادخال التاريخ" Error**
- **Cause**: Date range not entered before loading items
- **Solution**: Always enter date range before loading items
- **Prevention**: Date range entry is required for all printing operations

#### **"الرجاء اختيار الطابعة" Error**
- **Cause**: Printer not selected before printing
- **Solution**: Always select printer before printing
- **Prevention**: Printer selection is required for all printing operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before printing
- **Solution**: Always select item before printing
- **Prevention**: Item selection is required for all printing operations

#### **No Items Found**
- **Cause**: Patient has no dispensed items
- **Solution**: Verify patient has dispensed items before selection
- **Prevention**: Ensure patients have dispensed items

#### **Printing Failed Error**
- **Cause**: Printing cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before printing

#### **Printer Not Responding Error**
- **Cause**: Printer not available
- **Solution**: Verify printer is available before printing
- **Prevention**: Ensure proper validation before printing

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Printing Access**: Access to printing operations
- **Patient Access**: Access to patients with dispensed items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Printing Workflow**: Understanding of printing process
- **Patient Management**: Knowledge of patient selection and filtering
- **Item Management**: Knowledge of item selection and printing
- **Printing Management**: Familiarity with printing save and rejection operations

## Usage Examples

### Basic Printing Workflow

1. **Page Load**: Verify page loads with default data
2. **Patient Selection**: Select patient for item filtering
3. **Date Range Selection**: Enter date range for item filtering
4. **Item Selection**: Select item from dispensed items grid
5. **Printer Selection**: Select printer for printing
6. **Printing**: Click print button to generate barcode labels

### Multi-Item Printing Management

1. **Patient Selection**: Select patient for item filtering
2. **Date Range Selection**: Enter date range for item filtering
3. **Multiple Item Selection**: Select multiple items for printing
4. **Printer Selection**: Select printer for printing
5. **Printing**: Generate barcode labels for all selected items
6. **Completion**: Complete all printing operations

### Batch Printing Management

1. **Patient Selection**: Select patient for item filtering
2. **Date Range Selection**: Enter date range for item filtering
3. **Item Review**: Review all items for selected patient and date range
4. **Item Selection**: Select items for batch printing
5. **Printer Selection**: Select printer for batch printing
6. **Printing**: Generate barcode labels for batch items
7. **Completion**: Complete batch printing operations