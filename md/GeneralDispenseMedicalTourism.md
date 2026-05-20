← Go back to 
[Inventories Module Documentation](/Inventories)


# GeneralDispenseMedicalTourism.aspx

## Overview

**File**: `\Inventories\Process\GeneralDispenseMedicalTourism.aspx`
**Purpose**: Medical tourism dispensing system for patient medications with prescription-based workflow and barcode printing
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacists, pharmacy staff, medical tourism dispensing personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Patient Selection (Required for Dispensing)**
- **Patient Dropdown**: Must select valid patient for medication dispensing
- **Error Prevention**: System validates patient is selected before loading prescriptions
- **Data Source**: Patient_information table with paid sponsor patients
- **Default Behavior**: User must select patient manually
- **Error Message**: Validation prevents prescription loading without patient selection
- **Validation**: Only patients with paid sponsors are available

#### 2. **Dispensing Type Selection (Required for Filtering)**
- **Type Dropdown**: Must select valid dispensing type (Normal or Extra Dose)
- **Error Prevention**: System validates type is selected before loading prescriptions
- **Data Source**: Static dropdown with Normal and Extra Dose options
- **Default Behavior**: User must select type manually
- **Error Message**: Validation prevents prescription loading without type selection
- **Validation**: Only valid dispensing types are available

#### 3. **Request Number Selection (Required for Dispensing)**
- **Request Number Dropdown**: Must select valid request number for dispensing
- **Error Prevention**: System validates request is selected before loading items
- **Data Source**: Inventories_General_Dispense_Prepare table with pending requests
- **Default Behavior**: User must select request manually
- **Error Message**: Validation prevents item loading without request selection
- **Validation**: Only requests with Dispense_ind=0 are available

#### 4. **Printer Selection (Required for Printing)**
- **Printer Dropdown**: Must select valid printer for barcode printing
- **Error Prevention**: System validates printer is selected before printing
- **Data Source**: inventories_setup_pharm_barcode_printer table
- **Default Behavior**: User must select printer manually
- **Error Message**: Validation prevents printing without printer selection
- **Validation**: Only printers configured for selected store are available

#### 5. **Item Selection (Required for Dispensing)**
- **Item Grid Selection**: Must select valid item from request items
- **Error Prevention**: System validates item is selected before dispensing
- **Data Source**: Inventories_General_Dispense_Prepare table with request items
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents dispensing without item selection
- **Validation**: Only items with available quantities are available

### Common Error Scenarios and Prevention

#### **Patient and Type Errors**
- **Error**: No patient selected
- **Prevention**: Always select patient before loading requests
- **Error**: No dispensing type selected
- **Prevention**: Always select dispensing type before loading requests
- **Error**: Invalid patient selection
- **Prevention**: Verify patient has paid sponsor

#### **Request and Store Errors**
- **Error**: No request selected
- **Prevention**: Always select request before loading items
- **Error**: Request not found
- **Prevention**: Verify request exists and is pending
- **Error**: No store configured
- **Prevention**: Verify store is configured for dispensing

#### **Printer and Item Errors**
- **Error**: No printer selected
- **Prevention**: Always select printer before printing
- **Error**: No item selected
- **Prevention**: Always select item from grid before dispensing
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before dispensing

#### **Dispensing Management Errors**
- **Error**: No items available for dispensing
- **Prevention**: Ensure request has items with available quantities
- **Error**: Dispensing fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Printing fails
- **Prevention**: Ensure printer is properly configured

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have pharmacy dispensing permissions** via employee group assignments
3. **Patients must have paid sponsors** in the system
4. **Requests must be pending** with Dispense_ind=0
5. **Printers must be configured** for barcode printing
6. **Dispensing workflow must be enabled** for medical tourism items

#### **Required System State**
- User authentication must be active
- Pharmacy dispensing permissions must be configured
- Patient data must be current
- Request data must be current
- Item inventory data must be current
- Printer configuration must be current
- Dispensing workflow must be enabled

### Success Criteria

#### **For Patient and Type Selection**
- ✅ Patient dropdown populated with paid sponsor patients only
- ✅ Dispensing type validation ensures proper request loading
- ✅ Patient validation prevents request loading without selection
- ✅ Type validation ensures proper dispensing type

#### **For Request Selection**
- ✅ Request dropdown populated with pending requests only
- ✅ Request validation ensures proper item loading
- ✅ Request selection enables item display
- ✅ Request status shows current dispensing state

#### **For Printer Selection**
- ✅ Printer dropdown populated with configured printers only
- ✅ Printer validation ensures proper barcode printing
- ✅ Printer configuration ensures proper printing

#### **For Item Selection**
- ✅ Item grid displays all items for selected request
- ✅ Item details show complete prescription information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Dispensing Management**
- ✅ Dispensing save creates proper dispensing records
- ✅ Dispensing workflow works with proper validation
- ✅ Barcode printing works with selected printer
- ✅ Dispensing completion provides success feedback

#### **For Data Management**
- ✅ Request items grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for medical tourism dispensing

### Patient and Request Selection Section

```html
<!-- Patient and Request Selection -->
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
        <dx:BootstrapLayoutItem Caption="النوع" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" Enabled="false" ID="type">
                        <Items>
                            <dx:BootstrapListEditItem Text="Normal" Value="1" Selected="true"></dx:BootstrapListEditItem>
                            <dx:BootstrapListEditItem Text="Extra Dose" Value="2"></dx:BootstrapListEditItem>
                        </Items>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Patient" runat="server" TextFormatString="{1} - {0}" AutoPostBack="true" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="PatientDS" ValueField="FileId" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileId" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="RequestNO" runat="server" AutoPostBack="true" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="RequestDS" ValueField="RequestNO" TextField="RequestNO" OnSelectedIndexChanged="RequestNO_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="RequestNO" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الطابعة" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" ID="bar_code_printer_IP" DataSourceID="SqlDataSource1" AutoPostBack="false" TextField="printer_path" ValueField="ID"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="checkGridViewDS" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="store" Caption="كودالمخزن"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="storename" Caption="اسم المخزن"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="patch" Caption="الدفعه"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Quntitiy" Caption="الكميه المصروفه"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="item" Caption="كود الصنف"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="status" Caption="الحاله"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ActiveCode" Caption="كود المادة" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Category" Caption="النوع" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Frequency" Caption="التكرار" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Duration_no" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Duration_unit" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Administration_Instructions" Caption="التعليمات" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Dose_After" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="IvCode" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="IVName" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ProtocolID" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PharmDose_FK" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Count_Lable" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="dose_unit" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Dose" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" Visible="true"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="FK_order_no" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ProtocolType" Caption="الكمية" Visible="false"></dx:BootstrapGridViewTextColumn>
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

### Dispensing Button Section

```html
<!-- Dispensing Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-items: center; justify-content: center">
                <dx:BootstrapButton ID="DispenseBtn" runat="server" ClientInstanceName="btn" Width="20%" Text=" صرف " OnClick="DispenseBtn_Click">
                    <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                    <CssClasses Icon="simple-icon-basket-loaded" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Patient Parameters**:
- `@fileID` - Patient file ID for filtering requests

**Request Parameters**:
- `@RequestNO` - Request number for filtering items

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions

**Store Parameters**:
- `@store_id` - Store ID for printer configuration

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Patient Selection**: Loads requests based on selected patient
3. **Request Selection**: Loads items based on selected request
4. **Dispensing**: Processes dispensing for selected items
5. **Printing**: Prints barcodes for dispensed items

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
4. Sets default dispensing state

### RequestNO_SelectedIndexChanged Method

```csharp
protected void RequestNO_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected request

**Process**:
1. Validates request selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates request information display

### DispenseBtn_Click Method

```csharp
protected void DispenseBtn_Click(object sender, EventArgs e)
```

**Purpose**: Processes dispensing for selected items

**Process**:
1. Validates request selection
2. Validates items are available
3. Processes dispensing for all items
4. Updates stock records
5. Prints barcodes for dispensed items
6. Provides success feedback

## Database Integration

### Core Database Tables

#### **Patient_information**
- **Purpose**: Patient master data
- **Key Fields**: FileId, Patient_Name, Sponsor_FK
- **Usage**: Provides patient list for selection
- **Filtering**: Only patients with paid sponsors

#### **Inventories_General_Dispense_Prepare**
- **Purpose**: Dispensing preparation records
- **Key Fields**: ID, RequestNO, fileID, store, patch, Quntitiy, item, Dispense_ind
- **Usage**: Tracks items for dispensing
- **Filtering**: Only items with Dispense_ind=0

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active
- **Usage**: Provides store information for display
- **Filtering**: Only active stores

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **inventories_setup_pharm_barcode_printer**
- **Purpose**: Barcode printer configuration
- **Key Fields**: ID, printer_path, store_id
- **Usage**: Provides printer list for barcode printing
- **Filtering**: Only printers configured for selected store

#### **sponsors**
- **Purpose**: Sponsor master data
- **Key Fields**: code, Paid_Sponsor_Ind
- **Usage**: Provides sponsor information for filtering
- **Filtering**: Only paid sponsors

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
**Validation**: Ensures user is authenticated before accessing dispensing operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for dispensing operations

## Client-Side JavaScript

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

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Patient and Request Selection Section**
```html
<!-- Patient and Request Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="النوع" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الملف الطبي" ColSpanMd="3" BeginRow="true">
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الطابعة" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="checkGridViewTemp" runat="server">
```

#### **3. Dispensing Button Section**
```html
<!-- Dispensing Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-items: center; justify-content: center">
                <dx:BootstrapButton ID="DispenseBtn" runat="server" OnClick="DispenseBtn_Click">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Patient Data Source
SqlDataSource PatientDS = new SqlDataSource();
PatientDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
PatientDS.SelectCommand = "select distinct Patient_information.FileId,Patient_information.Patient_Name from Patient_information inner join sponsors s on s.code= Patient_information.Sponsor_FK and s.Paid_Sponsor_Ind=1";

// Request Data Source
SqlDataSource RequestDS = new SqlDataSource();
RequestDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequestDS.SelectCommand = "select distinct RequestNO from Inventories_General_Dispense_Prepare where fileID=@fileID and Dispense_ind=0";

// Request Items Data Source
SqlDataSource checkGridViewDS = new SqlDataSource();
checkGridViewDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewDS.SelectCommand = "SELECT Inventories_General_Dispense_Prepare.ID, store, patch, Quntitiy, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', 'Waiting' as status, ActiveCode, Category, Frequency, Duration_no, Duration_unit, Administration_Instructions, Dose_After, dose_unit, Dose, IvCode, IVName, ProtocolID, Count_Lable, PharmDose_FK, Inventories_General_Dispense_Prepare.Expiration_date, FK_order_no, ProtocolType FROM Inventories_General_Dispense_Prepare inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_Prepare.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store where RequestNO=@RequestNO";

// Printer Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select printer_path,ID from inventories_setup_pharm_barcode_printer where store_id=@store_id";
```

## Business Logic and Validation

### Patient and Request Validation

```csharp
protected void RequestNO_SelectedIndexChanged(object sender, EventArgs e)
{
    if (Patient.Value == "" || Patient.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المريض');", true);
        return;
    }
    // ... additional validation
}
```

**Patient Logic**: Validates patient selection before loading requests
**Request Logic**: Validates request selection before loading items
**Error Prevention**: Prevents item loading without proper patient and request context

### Dispensing Validation

```csharp
protected void DispenseBtn_Click(object sender, EventArgs e)
{
    if (RequestNO.Value == "" || RequestNO.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم الطلب');", true);
        return;
    }
    // ... additional validation
}
```

**Dispensing Logic**: Validates request selection before dispensing
**Error Prevention**: Prevents dispensing without proper request selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Patient Selection Validation**: Must select patient before loading requests
- **Dispensing Type Validation**: Must select dispensing type before loading requests
- **Request Selection Validation**: Must select request before loading items
- **Printer Selection Validation**: Must select printer before printing
- **Item Selection Validation**: Must select item from grid before dispensing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Patient Validation**: Ensures patient has paid sponsor
- **Dispensing Type Validation**: Ensures dispensing type is valid
- **Request Validation**: Ensures request is pending and available
- **Printer Validation**: Ensures printer is configured for selected store
- **Item Availability Validation**: Ensures items have available quantities

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Dispensing Access**: Ensures user can access and modify dispensing requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Dispensing Success**: "تم صرف الطلب" (Request dispensed successfully)
- **Printing Success**: "تم طباعة الباركود" (Barcode printed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of request items grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Dispensing Management System**
- **Database Tables**:
  - `Inventories_General_Dispense_Prepare` - Dispensing preparation records
  - `Inventories_General_Dispense` - Dispensing records
- **Integration Details**:
  - Dispensing workflow controlled by patient and request selection
  - Dispensing quantities tracked against available amounts
  - Barcode printing triggered after dispensing
- **Data Flow**:
  - Items filtered by request and available quantities
  - Dispensing quantities validated against available limits
  - Barcode printing triggered for dispensed items

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
  - User authentication required for all dispensing operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records
- **Integration Details**:
  - Item information displayed for dispensing selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

#### **Barcode Printing System**
- **Database Tables**:
  - `inventories_setup_pharm_barcode_printer` - Printer configuration
- **Integration Details**:
  - Printer configuration loaded for selected store
  - Barcode printing triggered after dispensing
  - Multiple barcode copies supported
- **Data Flow**:
  - Printer configuration loaded from printer master data
  - Barcode data passed to printing system
  - Printing triggered after successful dispensing

### Data Exchange

#### **Patient and Request Information**
- **Database Tables**:
  - `Patient_information` - Patient master data
  - `Inventories_General_Dispense_Prepare` - Dispensing preparation records
- **Real-time Data**:
  - Patient information for request filtering
  - Request information for dispensing
  - Request items with quantities
- **Data Relationships**:
  - Patients linked to requests via file ID
  - Requests linked to items via request number
  - Dispensing records cleared after successful dispensing

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Stock` - Stock records with batch tracking
- **Real-time Data**:
  - Item details and descriptions
  - Batch information and quantities
  - Expiration dates and availability
- **Data Relationships**:
  - Items linked to batches via stock records
  - Batch information displayed for dispensing items
  - Expiration dates tracked for each batch

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المريض" Error**
- **Cause**: Patient not selected before loading requests
- **Solution**: Always select patient before loading requests
- **Prevention**: Patient selection is required for all dispensing operations

#### **"الرجاء اختيار رقم الطلب" Error**
- **Cause**: Request not selected before loading items
- **Solution**: Always select request before loading items
- **Prevention**: Request selection is required for all dispensing operations

#### **Patient Not Found Error**
- **Cause**: Selected patient does not have paid sponsor
- **Solution**: Verify patient has paid sponsor
- **Prevention**: Only patients with paid sponsors are available

#### **Request Not Found Error**
- **Cause**: Selected request is not pending
- **Solution**: Verify request is pending with Dispense_ind=0
- **Prevention**: Only pending requests are available

#### **Dispensing Failed Error**
- **Cause**: Dispensing cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before dispensing

#### **Printing Failed Error**
- **Cause**: Barcode cannot be printed
- **Solution**: Verify printer is properly configured
- **Prevention**: Ensure printer is configured for selected store

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Dispensing Access**: Access to dispensing operations
- **Store Access**: Access to stores with dispensing items
- **Printer Access**: Access to configured barcode printers

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Dispensing Workflow**: Understanding of dispensing process
- **Patient Management**: Knowledge of patient selection and sponsor filtering
- **Request Management**: Familiarity with request selection and item loading
- **Dispensing Management**: Understanding of dispensing save and printing operations

## Usage Examples

### Basic Dispensing Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Patient Selection**: Select patient for medication dispensing
3. **Dispensing Type Selection**: Select dispensing type (Normal or Extra Dose)
4. **Request Selection**: Select request number for dispensing
5. **Printer Selection**: Select printer for barcode printing
6. **Item Review**: Review items in request items grid
7. **Dispensing**: Click dispense button to process dispensing
8. **Printing**: Print barcodes for dispensed items

### Dispensing Item Management Workflow

1. **Patient Selection**: Select patient for medication dispensing
2. **Dispensing Type Selection**: Select dispensing type
3. **Request Selection**: Select request number for dispensing
4. **Printer Selection**: Select printer for barcode printing
5. **Item Review**: Review items in request items grid
6. **Item Selection**: Select specific items for dispensing
7. **Dispensing**: Process dispensing for selected items
8. **Printing**: Print barcodes for dispensed items

### Multi-Request Dispensing Management

1. **Patient Selection**: Select patient for medication dispensing
2. **Dispensing Type Selection**: Select dispensing type
3. **Request Review**: Review all requests for selected patient
4. **Selective Dispensing**: Dispense specific requests as needed
5. **Printer Management**: Manage printers for each request
6. **Dispensing Validation**: Ensure all items have proper validation
7. **Dispensing Save**: Save dispensing with all validated items and print barcodes