← Go back to 
[Inventories Module Documentation](/Inventories)


# UsageApproval.aspx

## Overview

**File**: `\Inventories\Process\UsageApproval.aspx`
**Purpose**: Usage approval page for confirming and approving item usage from dispense requests
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Warehouse staff, inventory administrators, usage approval personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Type Selection (Required for Loading Requests)**
- **Store Type Dropdown**: Must select valid store type for loading requests
- **Error Prevention**: System validates store type is selected before loading requests
- **Data Source**: Inventories_Dispense_types_header table with store type information
- **Default Behavior**: User must select store type manually
- **Error Message**: Validation prevents request loading without store type selection
- **Validation**: Only active store types with Sub=1 are available

#### 2. **Request Type Selection (Required for Loading Requests)**
- **Request Type Dropdown**: Must select valid request type for loading requests
- **Error Prevention**: System validates request type is selected before loading requests
- **Data Source**: Inventories_Dispense_types_Link table with request type information
- **Default Behavior**: User must select request type manually
- **Error Message**: Validation prevents request loading without request type selection
- **Validation**: Only active request types are available

#### 3. **Request Selection (Required for Loading Items)**
- **Request Dropdown**: Must select valid request for loading items
- **Error Prevention**: System validates request is selected before loading items
- **Data Source**: Inventories_Dispense_Request_Header table with request information
- **Default Behavior**: User must select request manually
- **Error Message**: Validation prevents item loading without request selection
- **Validation**: Only active requests with matching OrderType are available

#### 4. **Item Selection (Required for Usage Approval)**
- **Item Grid Selection**: Must select valid item from request items
- **Error Prevention**: System validates item is selected before usage approval
- **Data Source**: Inventories_Dispense_Request_Details table with item information
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents usage approval without item selection
- **Validation**: Only items with Exchange_Status='p' and Direct_Verify='1' are available

#### 5. **U, R, C Values Input (Required for Usage Approval)**
- **U Field**: Must enter valid U value for usage approval
- **R Field**: Must enter valid R value for usage approval
- **C Field**: Must enter valid C value for usage approval
- **Error Prevention**: System validates U, R, C values are entered before usage approval
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter U, R, C values manually
- **Error Message**: Validation prevents usage approval without U, R, C values
- **Validation**: U, R, C values must be valid numbers

#### 6. **Confirmation Action (Required for Confirmation)**
- **Confirm Button**: Must click confirm button to confirm usage approval
- **Error Prevention**: System validates confirmation action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click confirm button manually
- **Error Message**: Validation prevents confirmation without user action
- **Validation**: Confirmation action must be explicitly selected

### Common Error Scenarios and Prevention

#### **Store Type Selection Errors**
- **Error**: No store type selected
- **Prevention**: Always select store type before loading requests
- **Error**: Store type has no request types
- **Prevention**: Verify store type has request types

#### **Request Type Selection Errors**
- **Error**: No request type selected
- **Prevention**: Always select request type before loading requests
- **Error**: Request type has no requests
- **Prevention**: Verify request type has requests

#### **Request Selection Errors**
- **Error**: No request selected
- **Prevention**: Always select request before loading items
- **Error**: Request has no items pending usage approval
- **Prevention**: Verify request has items pending usage approval

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before usage approval
- **Error**: Item has no remaining quantity
- **Prevention**: Verify item has remaining quantity before selection

#### **U, R, C Values Errors**
- **Error**: No U, R, C values entered
- **Prevention**: Always enter U, R, C values before usage approval
- **Error**: Invalid U, R, C values
- **Prevention**: Always enter valid U, R, C values

#### **Confirmation Errors**
- **Error**: Confirmation fails
- **Prevention**: Ensure usage approval is selected before confirmation
- **Error**: Items not reviewed
- **Prevention**: Review all items before confirmation

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have usage approval permissions** via employee group assignments
3. **Store types must be configured** in the system
4. **Request types must be configured** in the system
5. **Requests must be pending usage approval** in the system
6. **Items must be available** for usage approval

#### **Required System State**
- User authentication must be active
- Usage approval permissions must be configured
- Store type data must be current
- Request type data must be current
- Request data must be available
- Item data must be available

### Success Criteria

#### **For Store Type Selection**
- ✅ Store type dropdown populated with active store types only
- ✅ Store type validation ensures proper request type loading
- ✅ Store type selection enables request type filtering

#### **For Request Type Selection**
- ✅ Request type dropdown populated with active request types only
- ✅ Request type validation ensures proper request loading
- ✅ Request type selection enables request filtering

#### **For Request Selection**
- ✅ Request dropdown populated with pending usage approval requests only
- ✅ Request validation ensures proper item loading
- ✅ Request selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected request
- ✅ Item details show complete usage approval information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Usage Approval Management**
- ✅ Usage approval creates proper usage approval records
- ✅ Item selection enables usage approval workflow
- ✅ Usage approval workflow works with proper validation
- ✅ Usage approval completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for usage approval

### Store Type and Request Type Selection Section

```html
<!-- Store Type and Request Type Selection -->
<dx:BootstrapLayoutItem Caption="نوع المخزن" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="typeHeader" DataSourceID="typeHeaderDS" AutoPostBack="true" TextField="Description" ValueField="ID" OnSelectedIndexChanged="typeHeader_SelectedIndexChanged"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="type" DataSourceID="typeDS" AutoPostBack="true" TextField="Desc" ValueField="id" OnSelectedIndexChanged="type_SelectedIndexChanged"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="رقم طلب الصرف" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="Requt" DataSourceID="RequestDS" AutoPostBack="true" TextField="OrderNo" ValueField="id" OnSelectedIndexChanged="Requt_SelectedIndexChanged"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### User Information Section

```html
<!-- User Information -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
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
        <dx:BootstrapLayoutItem Caption="المعدة" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Equipment" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="EquipmentDS" ValueField="item_code" TextField="arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="مسئول التشغيل" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="opUser" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="opUserDS" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="RequstItemsDS" OnSelectionChanged="RequesrItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="store_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية المطلوبة" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done" Caption="الكمية المنصرفة" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain" Caption="الكمية المتبقية" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="تاريخ الصرف" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="arabic_name" SummaryType="Count" DisplayFormat="عدد الاصناف = {0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="كمية الاصناف = {0 }" />
                </TotalSummary>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### U, R, C Values Section

```html
<!-- U, R, C Values -->
<dx:BootstrapLayoutItem Caption="U" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" ID="U" Enabled="true" AllowMouseWheel="false" Width="100%">
                <SpinButtons ClientVisible="false" />
            </dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="R" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" Enabled="true" Width="100%" AllowMouseWheel="false" ID="R">
                <SpinButtons ClientVisible="false" />
            </dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="C" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
    <CssClasses Control="" />
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" ID="C" Enabled="true" Width="100%" AllowMouseWheel="false" AutoPostBack="true">
                <SpinButtons ClientVisible="false" />
            </dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Confirmation Button Section

```html
<!-- Confirmation Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-items: center; justify-content: center">
                <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="20%" Text="تأكيد الأستخدام" OnClick="save_btn_Click">
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

**Store Type Parameters**:
- `@fk` - Store type header ID for filtering request types

**Request Type Parameters**:
- `@type` - Request type ID for filtering requests

**Request Parameters**:
- `@header` - Request header ID for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Type Selection**: Loads request types based on selected store type
3. **Request Type Selection**: Loads requests based on selected request type
4. **Request Selection**: Loads items based on selected request
5. **Item Selection**: Loads item information for selected item
6. **U, R, C Values Entry**: Enters U, R, C values for usage approval
7. **Usage Approval Save**: Saves complete usage approval records

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store type information
3. Sets default usage approval state
4. Initializes date displays

### typeHeader_SelectedIndexChanged Method

```csharp
protected void typeHeader_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads request types based on selected store type

**Process**:
1. Validates store type selection
2. Sets parameters for request type data source
3. Binds request type dropdown
4. Updates store type information display

### type_SelectedIndexChanged Method

```csharp
protected void type_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads requests based on selected request type

**Process**:
1. Validates request type selection
2. Sets parameters for request data source
3. Binds request dropdown
4. Updates request type information display

### Requet_SelectedIndexChanged Method

```csharp
protected void Requet_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected request

**Process**:
1. Validates request selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates request information display

### RequesrItems_SelectionChanged Method

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected item

**Process**:
1. Validates item selection
2. Loads item details
3. Updates item information display
4. Enables usage approval workflow

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete usage approval records

**Process**:
1. Validates all required fields are filled
2. Validates U, R, C values are entered
3. Validates item selection
4. Checks item availability
5. Inserts usage approval records
6. Refreshes all grids and controls
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Dispense_types_header**
- **Purpose**: Dispense type header information
- **Key Fields**: ID, Description, active, Sub
- **Usage**: Provides store type list for filtering
- **Filtering**: Only active store types with Sub=1

#### **Inventories_Dispense_types_Link**
- **Purpose**: Dispense type link information
- **Key Fields**: id, type, type_header
- **Usage**: Provides request type list for filtering
- **Filtering**: Only active request types

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Dispense request header information
- **Key Fields**: id, OrderNo, Active, OrderType
- **Usage**: Tracks request information for usage approval
- **Filtering**: Only active requests with matching OrderType

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Dispense request details with item information
- **Key Fields**: id, Header_FK, item_code, Quntity, Done, Remain, Due_Date, Item_Type_id, doc_id, store_id, Exchange_Status, Direct_Verify
- **Usage**: Tracks request items for usage approval
- **Filtering**: Only items with Exchange_Status='p' and Direct_Verify='1'

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Item_Type_id, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, arabic_name
- **Usage**: Provides item type information for display

#### **Inventories_Stock**
- **Purpose**: Stock records with item information
- **Key Fields**: doc_id, storeid, MoveType
- **Usage**: Tracks stock items for usage approval
- **Filtering**: Only items with MoveType='3'

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name
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
**Validation**: Ensures user is authenticated before accessing usage approval data

#### **Store Type Filtering**
```sql
SELECT ID, Description FROM Inventories_Dispense_types_header WHERE (active = 1) and Sub=1
```

**Filtering Logic**: Shows only active store types with Sub=1
**Permission Logic**: Only active store types with Sub=1 are available
**Validation**: Ensures store type has request types

#### **Request Type Filtering**
```sql
SELECT (SELECT Description FROM Inventories_Dispense_types where id = type) 'Desc', (SELECT id FROM Inventories_Dispense_types where id = type) id FROM Inventories_Dispense_types_Link L inner join Inventories_Dispense_types_header TH on TH.ID = L.type_header where TH.ID = @fk and (active = 1)
```

**Filtering Logic**: Shows only active request types for selected store type
**Permission Logic**: Only active request types for selected store type are available
**Validation**: Ensures request type has requests

#### **Request Filtering**
```sql
SELECT distinct H.id, OrderNo FROM Inventories_Dispense_Request_Header H inner join Inventories_Dispense_Request_Details on H.id = Header_FK where Active = 1 and OrderType = @type
```

**Filtering Logic**: Shows only active requests with matching OrderType
**Permission Logic**: Only active requests with matching OrderType are available
**Validation**: Ensures request has items pending usage approval

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store type, request type, and request dropdowns

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

#### **1. Store Type and Request Type Selection Section**
```html
<!-- Store Type and Request Type Selection -->
<dx:BootstrapLayoutItem Caption="نوع المخزن" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="رقم طلب الصرف" ColSpanMd="4">
```

#### **2. User Information Section**
```html
<!-- User Information -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الإدارة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسئول" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المعدة" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="مسئول التشغيل" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. U, R, C Values Section**
```html
<!-- U, R, C Values -->
<dx:BootstrapLayoutItem Caption="U" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="R" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="C" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
```

#### **5. Confirmation Button Section**
```html
<!-- Confirmation Button -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Type Data Source
SqlDataSource typeHeaderDS = new SqlDataSource();
typeHeaderDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
typeHeaderDS.SelectCommand = "SELECT ID, Description FROM Inventories_Dispense_types_header WHERE (active = 1) and Sub=1";

// Request Type Data Source
SqlDataSource typeDS = new SqlDataSource();
typeDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
typeDS.SelectCommand = "SELECT (SELECT Description FROM Inventories_Dispense_types where id = type) 'Desc', (SELECT id FROM Inventories_Dispense_types where id = type) id FROM Inventories_Dispense_types_Link L inner join Inventories_Dispense_types_header TH on TH.ID = L.type_header where TH.ID = @fk and (active = 1)";

// Request Data Source
SqlDataSource RequestDS = new SqlDataSource();
RequestDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequestDS.SelectCommand = "SELECT distinct H.id, OrderNo FROM Inventories_Dispense_Request_Header H inner join Inventories_Dispense_Request_Details on H.id = Header_FK where Active = 1 and OrderType = @type";

// Item Data Source
SqlDataSource RequstItemsDS = new SqlDataSource();
RequstItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequstItemsDS.SelectCommand = "SELECT Temp.Item_Type_id, Temp.id, IIS.arabic_name, ISett.arabic_name Discription, IIS.item_code, IIS.item_code, Quntity, Done, Remain, Temp.doc_id, Temp.store_id, Due_Date FROM Inventories_Dispense_Request_Details Temp inner join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code inner join Inventories_Stock st on Temp.doc_id = st.doc_id and Temp.store_id = st.storeid and st.MoveType='3' left join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id WHERE Temp.Header_FK = @header and Exchange_Status='p' and Direct_Verify='1'";

// Department Data Source
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID, Dep_Name FROM DefinitionDep";

// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name, Emp_Code from Users where Emp_Code not in ('0','00')";

// Equipment Data Source
SqlDataSource EquipmentDS = new SqlDataSource();
EquipmentDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
EquipmentDS.SelectCommand = "SELECT arabic_name, item_code FROM Inventories_Item_Settings WHERE (active = 1) and Item_Type_id=5";

// Operation User Data Source
SqlDataSource opUserDS = new SqlDataSource();
opUserDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
opUserDS.SelectCommand = "select User_Name, Emp_Code from Users where Emp_Code not in ('0','00')";
```

## Business Logic and Validation

### Store Type Selection Validation

```csharp
protected void typeHeader_SelectedIndexChanged(object sender, EventArgs e)
{
    if (typeHeader.Value == "" || typeHeader.Value == null)
    {
        // Clear request type dropdown
        type.DataSource = null;
        type.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Type Logic**: Validates store type selection before loading request types
**Error Prevention**: Prevents request type loading without store type selection

### Request Type Selection Validation

```csharp
protected void type_SelectedIndexChanged(object sender, EventArgs e)
{
    if (type.Value == "" || type.Value == null)
    {
        // Clear request dropdown
        Requet.DataSource = null;
        Requet.DataBind();
        return;
    }
    // ... additional validation
}
```

**Request Type Logic**: Validates request type selection before loading requests
**Error Prevention**: Prevents request loading without request type selection

### Request Selection Validation

```csharp
protected void Requet_SelectedIndexChanged(object sender, EventArgs e)
{
    if (Requt.Value == "" || Requet.Value == null)
    {
        // Clear item grid
        RequesrItems.DataSource = null;
        RequesrItems.DataBind();
        return;
    }
    // ... additional validation
}
```

**Request Logic**: Validates request selection before loading items
**Error Prevention**: Prevents item loading without request selection

### Item Selection Validation

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
{
    if (RequesrItems.Selection.Count == 0)
    {
        // Clear item information
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading item information
**Error Prevention**: Prevents item information loading without item selection

### U, R, C Values Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (U.Value == null || R.Value == null || C.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال القيم U, R, C');", true);
        return;
    }
    // ... additional validation
}
```

**U, R, C Values Logic**: Validates U, R, C values are entered before usage approval
**Error Prevention**: Prevents usage approval without U, R, C values

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Type Selection Validation**: Must select store type before loading request types
- **Request Type Selection Validation**: Must select request type before loading requests
- **Request Selection Validation**: Must select request before loading items
- **Item Selection Validation**: Must select item before loading item information
- **U, R, C Values Validation**: Must enter U, R, C values before usage approval

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Type Validation**: Ensures store type is active and has Sub=1
- **Request Type Validation**: Ensures request type is active
- **Request Validation**: Ensures request is pending usage approval
- **Item Validation**: Ensures item has Exchange_Status='p' and Direct_Verify='1'
- **U, R, C Values Validation**: Ensures U, R, C values are valid numbers

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Request Access**: Ensures user has access to selected request
- **Usage Approval Access**: Ensures user can access and modify usage approval records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Usage Approval Success**: "تم تأكيد الأستخدام" (Usage approval confirmed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Usage Approval Management System**
- **Database Tables**:
  - `Inventories_Dispense_types_header` - Dispense type header information
  - `Inventories_Dispense_types_Link` - Dispense type link information
  - `Inventories_Dispense_Request_Header` - Dispense request header information
  - `Inventories_Dispense_Request_Details` - Dispense request item details
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_item_type` - Item type master data
  - `Inventories_Stock` - Stock records with item information
  - `DefinitionDep` - Department master data
  - `Users` - User master data
- **Integration Details**:
  - Store type selection controls request type filtering
  - Request type selection controls request filtering
  - Request selection controls item display
  - Item selection controls usage approval
  - Usage approval tracked with complete information
- **Data Flow**:
  - Store types filtered for user access
  - Request types filtered by store type
  - Requests filtered by request type
  - Items filtered by request
  - Usage approval tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all usage approval operations
  - Request access controlled by user permissions

### Data Exchange

#### **Store Type and Request Type Information**
- **Database Tables**:
  - `Inventories_Dispense_types_header` - Dispense type header information
  - `Inventories_Dispense_types_Link` - Dispense type link information
- **Real-time Data**:
  - Store type information for filtering
  - Request type information for filtering
- **Data Relationships**:
  - Store types linked to request types via type_header
  - Request types linked to requests via type
  - Usage approval tracked by user

#### **Request and Item Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Dispense request header information
  - `Inventories_Dispense_Request_Details` - Dispense request item details
- **Real-time Data**:
  - Request information for usage approval
  - Item information for usage approval
- **Data Relationships**:
  - Requests linked to items via Header_FK
  - Items linked to usage approval via item_code
  - Usage approval tracked by user

#### **Item and Usage Approval Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details` - Dispense request item details
  - `Inventories_Stock` - Stock records with item information
- **Real-time Data**:
  - Item details and descriptions
  - Usage approval quantities and dates
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to usage approval via item_code
  - Usage approval tracked by request
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع المخزن" Error**
- **Cause**: Store type not selected before loading request types
- **Solution**: Always select store type before loading request types
- **Prevention**: Store type selection is required for all usage approval operations

#### **"الرجاء اختيار نوع الطلب" Error**
- **Cause**: Request type not selected before loading requests
- **Solution**: Always select request type before loading requests
- **Prevention**: Request type selection is required for all usage approval operations

#### **"الرجاء اختيار طلب الصرف" Error**
- **Cause**: Request not selected before loading items
- **Solution**: Always select request before loading items
- **Prevention**: Request selection is required for all usage approval operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before usage approval
- **Solution**: Always select item before usage approval
- **Prevention**: Item selection is required for all usage approval operations

#### **"الرجاء ادخال القيم U, R, C" Error**
- **Cause**: U, R, C values not entered before usage approval
- **Solution**: Always enter U, R, C values before usage approval
- **Prevention**: U, R, C values entry is required for all usage approval operations

#### **No Requests Found**
- **Cause**: No requests pending usage approval
- **Solution**: Verify requests are pending usage approval
- **Prevention**: Ensure requests are pending usage approval

#### **Usage Approval Failed Error**
- **Cause**: Usage approval cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before usage approval

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Usage Approval Access**: Access to usage approval operations
- **Request Access**: Access to requests with usage approval items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Usage Approval Workflow**: Understanding of usage approval process
- **Request Management**: Knowledge of request selection and usage approval
- **Usage Approval Management**: Knowledge of usage approval creation and management

## Usage Examples

### Basic Usage Approval Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Type Selection**: Select store type for request type filtering
3. **Request Type Selection**: Select request type for request filtering
4. **Request Selection**: Select request for item loading
5. **Item Selection**: Select item from request items grid
6. **U, R, C Values Entry**: Enter U, R, C values for usage approval
7. **Usage Approval Save**: Save complete usage approval records

### Multi-Item Usage Approval Management

1. **Store Type Selection**: Select store type for request type filtering
2. **Request Type Selection**: Select request type for request filtering
3. **Request Selection**: Select request for item loading
4. **Multiple Item Selection**: Select multiple items for usage approval
5. **U, R, C Values Entry**: Enter U, R, C values for each item
6. **Usage Approval Save**: Save complete usage approval with all items
7. **Usage Approval Verification**: Verify usage approval is saved correctly