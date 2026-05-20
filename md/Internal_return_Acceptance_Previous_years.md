← Go back to 
[Inventories Module Documentation](/Inventories)


# Internal_return_Acceptance_Previous_years.aspx

## Overview

**File**: `\Inventories\Process\Internal_return_Acceptance_Previous_years.aspx`
**Purpose**: Internal return acceptance system for previous years' inventory items with approval workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, return acceptance personnel, department managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Department Selection (Required for Filtering)**
- **Department Dropdown**: Must select valid department for return filtering
- **Error Prevention**: System validates department is selected before loading returns
- **Data Source**: DefinitionDep table with department information
- **Default Behavior**: User must select department manually
- **Error Message**: Validation prevents return loading without department selection
- **Validation**: Only active departments are available

#### 2. **Store Selection (Required for Items)**
- **Store Dropdown**: Must select valid store for item filtering
- **Error Prevention**: System validates store is selected before loading items
- **Data Source**: Inventories_wharehouse_store table linked with store rules
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item loading without store selection
- **Validation**: Only stores with active rules are available

#### 3. **Financial Year Selection (Required for Filtering)**
- **Financial Year Dropdown**: Must select valid financial year for return filtering
- **Error Prevention**: System validates financial year is selected before loading returns
- **Data Source**: Inventories_Stock_Years table with financial year information
- **Default Behavior**: User must select financial year manually
- **Error Message**: Validation prevents return loading without financial year selection
- **Validation**: Only active financial years are available

#### 4. **Dispense Document Selection (Required for Acceptance)**
- **Dispense Document Dropdown**: Must select valid dispense document for acceptance
- **Error Prevention**: System validates dispense document is selected before loading items
- **Data Source**: Inventory_internal_Return_Previous_years_Aprrove stored procedure
- **Default Behavior**: User must select dispense document manually
- **Error Message**: Validation prevents item loading without dispense document selection
- **Validation**: Only valid dispense documents are available

#### 5. **Item Selection (Required for Acceptance)**
- **Item Grid Selection**: Must select valid item from return items
- **Error Prevention**: System validates item is selected before acceptance
- **Data Source**: Inventories_Internal_Return_Previous_years table with return items
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents acceptance without item selection
- **Validation**: Only items with Exchange_Status='A' are available

#### 6. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason for rejection
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without rejection reason selection
- **Validation**: Only active rejection reasons are available

### Common Error Scenarios and Prevention

#### **Department and Store Errors**
- **Error**: No department selected
- **Prevention**: Always select department before loading returns
- **Error**: No store selected
- **Prevention**: Always select store before loading items
- **Error**: Store has no available items
- **Prevention**: Verify store has items with available quantities

#### **Financial Year and Document Errors**
- **Error**: No financial year selected
- **Prevention**: Always select financial year before loading returns
- **Error**: No dispense document selected
- **Prevention**: Always select dispense document before loading items
- **Error**: Invalid dispense document
- **Prevention**: Verify dispense document is valid and available

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item from grid before acceptance
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before acceptance
- **Error**: Item already fully returned
- **Prevention**: Verify item has remaining quantity

#### **Acceptance and Rejection Errors**
- **Error**: No items selected for acceptance
- **Prevention**: Select at least one item before acceptance
- **Error**: No rejection reason selected
- **Prevention**: Always select rejection reason before rejection
- **Error**: Acceptance fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have return acceptance permissions** via employee group assignments
3. **Departments must be configured** in the system
4. **Stores must have available items** for return
5. **Financial years must be configured** in the system
6. **Dispense documents must be pending** for acceptance
7. **Return workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Return acceptance permissions must be configured
- Department data must be current
- Store data must be current
- Financial year data must be current
- Dispense document data must be current
- Return workflow must be enabled

### Success Criteria

#### **For Department Selection**
- ✅ Department dropdown populated with active departments only
- ✅ Department validation ensures proper return loading
- ✅ Department selection enables return workflow

#### **For Store Selection**
- ✅ Store dropdown populated with available stores only
- ✅ Store validation ensures proper item filtering
- ✅ Store selection enables item loading

#### **For Financial Year Selection**
- ✅ Financial year dropdown populated with active financial years only
- ✅ Financial year validation ensures proper return loading
- ✅ Financial year selection enables return workflow

#### **For Dispense Document Selection**
- ✅ Dispense document dropdown populated with valid documents only
- ✅ Dispense document validation ensures proper item loading
- ✅ Dispense document selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected dispense document
- ✅ Item details show complete return information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Acceptance Management**
- ✅ Acceptance creates proper acceptance records
- ✅ Item selection enables acceptance workflow
- ✅ Acceptance workflow works with proper validation
- ✅ Acceptance completion provides success feedback

#### **For Data Management**
- ✅ Return items grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for internal return acceptance

### Department and Store Selection Section

```html
<!-- Department and Store Selection -->
<dx:BootstrapLayoutGroup Caption="قبول الارتجاع الداخلى" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
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
        <dx:BootstrapLayoutItem Caption="المخزن" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="PO_type" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="StoresPerDS" ValueField="code" TextField="arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="السنة المالية" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="dcyear" runat="server" TextFormatString="{0}" EnableMultiColumn="true" CallbackPageSize="15" AutoPostBack="true" CssClasses-Caption="font-weight-bold w-15" CssClasses-Control="d-flex w-100 ml-4" EnableCallbackMode="false" DataSourceID="adoyear" ValueField="Stock_Table_Name" TextField="Stock_Year">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Stock_Year" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم المستند الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" Width="100%" AutoPostBack="true" ID="txt_doc_no_Exchange" DataSourceID="ExMove" TextField="doc_id" ValueField="doc_id"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Return Items Grid Section

```html
<!-- Return Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource5" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessSelectionChangedOnServer="true" ProcessFocusedRowChangedOnServer="true"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="english_name" Caption="اسم الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Exchange_unit" Caption="وحدة الصرف" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Depname" Caption="الادارة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Stock_ID" Caption="الادارة" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Emp2" Caption="الموظف" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="EquipName" Caption="المعدة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="fileid" Caption="ملف طبى" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Account" Caption="حساب مريض" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="RespnsableUser2" Caption="مسئول التشغيل" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="المخزن" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم مستند الاضافة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount_Done_Exchange" Caption="الرصيد المصروف" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Return_Quntity" Caption="المرتجع" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="used" Caption="الكمية بعد الارتجاع" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="كود المخزن" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الباتش" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Header_FK" Caption=" " VisibleIndex="2" Visible="false"></dx:BootstrapGridViewTextColumn>
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

### Acceptance and Rejection Section

```html
<!-- Acceptance and Rejection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn6" Text="   قبول  الإرتجاع   " OnClick="save_btn_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn6,'btn6'); }" />
                        <CssClasses Icon="simple-icon-check" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Text=" رفض  الارتجاع " OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbReasons" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15">
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

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@emp` - Employee code for filtering stores and permissions
- `@user` - Username for filtering temporary records

**Store Parameters**:
- `@store` - Store ID for filtering items

**Document Parameters**:
- `@ID` - Document ID for filtering items
- `@TableName` - Financial year table name for filtering

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Department Selection**: Loads department information
3. **Store Selection**: Loads items based on selected store
4. **Financial Year Selection**: Loads returns based on selected financial year
5. **Dispense Document Selection**: Loads items based on selected dispense document
6. **Item Selection**: Loads item information for selected item
7. **Acceptance**: Processes acceptance for selected items
8. **Rejection**: Processes rejection for selected items with reason

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
4. Sets default acceptance state

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Accepts selected return items

**Process**:
1. Validates item selection
2. Validates acceptance permissions
3. Updates return status to accepted
4. Refreshes return items grid
5. Provides success feedback

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected return items with reason

**Process**:
1. Validates item selection
2. Validates rejection reason selection
3. Updates return status to rejected
4. Refreshes return items grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active, Store_type
- **Usage**: Provides store list for item filtering
- **Filtering**: Only stores with active rules

#### **Inventories_Stock_Years**
- **Purpose**: Financial year master data
- **Key Fields**: Stock_Year, Stock_Table_Name, active
- **Usage**: Provides financial year list for filtering
- **Filtering**: Only active financial years

#### **Inventories_Internal_Return_Previous_years**
- **Purpose**: Internal return records for previous years
- **Key Fields**: ID, doc_id, Itemcode, storeid, Amount_Done_Exchange, Return_Quntity, Exchange_Status, Active, Request, Approve, Return_Accepance
- **Usage**: Tracks return items for acceptance
- **Filtering**: Only items with Exchange_Status='A' and Active='1'

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, english_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for returns
- **Filtering**: Only active reasons with type=17

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
**Validation**: Ensures user is authenticated before accessing acceptance operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for acceptance operations

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp
```

**Filtering Logic**: Shows only stores with active rules for user
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has acceptance items

## Client-Side JavaScript

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

#### **1. Department and Store Selection Section**
```html
<!-- Department and Store Selection -->
<dx:BootstrapLayoutGroup Caption="قبول الارتجاع الداخلى" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المخزن" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="السنة المالية" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Return Items Grid Section**
```html
<!-- Return Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGridViewTemp" runat="server">
```

#### **3. Acceptance and Rejection Section**
```html
<!-- Acceptance and Rejection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
    </Items>
</dx:BootstrapLayoutGroup>
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Department Data Source
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID,Dep_Name FROM DefinitionDep";

// Store Data Source
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp";

// Financial Year Data Source
SqlDataSource adoyear = new SqlDataSource();
adoyear.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
adoyear.SelectCommand = "select Inventories_Stock_Years.Stock_Year,Stock_Table_Name from Inventories_Stock_Years where active=1 and Stock_Year<>'Stock'";

// Dispense Document Data Source
SqlDataSource ExMove = new SqlDataSource();
ExMove.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ExMove.SelectCommand = "[Inventory_internal_Return_Previous_years_Aprrove]";

// Return Items Data Source
SqlDataSource SqlDataSource5 = new SqlDataSource();
SqlDataSource5.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource5.SelectCommand = "select distinct Inventories_Internal_Return_Previous_years.Header_FK,(SELECT Dep_Name FROM Orman.dbo.DefinitionDep WHERE DepID=Dep) Depname,(select User_Name from Users where Emp_Code=convert(nvarchar,RespnsableUser)) RespnsableUser2,(select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp,(SELECT arabic_name FROM Inventories_Item_Settings where item_code=EquipID) EquipName,Account,fileid,Inventories_Internal_Return_Previous_years.doc_id,Inventories_Internal_Return_Previous_years.ID,Inventories_Internal_Return_Previous_years.PO_ID_FK,Inventories_Internal_Return_Previous_years.Itemcode,Inventories_Item_Settings.english_name,Inventories_Internal_Return_Previous_years.Price_unit,Inventories_Internal_Return_Previous_years.Grand_Total,Inventories_Internal_Return_Previous_years.doc_id,Inventories_Internal_Return_Previous_years.storeid,Inventories_Internal_Return_Previous_years.inv_num,Exchange_unit.description as Exchange_unit,Store_unit.description as Store_unit,Inventories_Internal_Return_Previous_years.Amount_Done_Exchange,Inventories_Internal_Return_Previous_years.Amount_Done,Inventories_Internal_Return_Previous_years.Expiration_date,batch_no,Return_Quntity,Amount_Done_Exchange - Return_Quntity 'used',Stock_ID from Inventories_Internal_Return_Previous_years inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Internal_Return_Previous_years.Itemcode inner join Inventories_UOM Exchange_unit on Exchange_unit.id=Inventories_Internal_Return_Previous_years.ItemUnit_Exchange_id inner join Inventories_UOM Store_unit on Store_unit.id=Inventories_Internal_Return_Previous_years.ItemUnit_storage_Id left join Inventories_Dispense_Request_Details details on details.Header_FK =Inventories_Internal_Return_Previous_years.dispense_request left join Inventories_Dispense_Request_Header head on head.id = details.Header_FK where Inventories_Internal_Return_Previous_years.doc_id=@ID and (MoveType = 3) and Exchange_Status='A' and storeid=@store and Request=1 and Approve=1 and Return_Accepance=0 and Inventories_Internal_Return_Previous_years.Active='1'";

// Rejection Reason Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=17";
```

## Business Logic and Validation

### Department and Store Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (Dep.Value == "" || Dep.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الادارة');", true);
        return;
    }
    // ... additional validation
}
```

**Department Logic**: Validates department selection before acceptance
**Store Logic**: Validates store selection before loading items
**Error Prevention**: Prevents acceptance without proper department and store context

### Financial Year Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (dcyear.Value == "" || dcyear.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السنة المالية');", true);
        return;
    }
    // ... additional validation
}
```

**Financial Year Logic**: Validates financial year selection before acceptance
**Error Prevention**: Prevents acceptance without proper financial year selection

### Dispense Document Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (txt_doc_no_Exchange.Value == "" || txt_doc_no_Exchange.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند الصرف');", true);
        return;
    }
    // ... additional validation
}
```

**Dispense Document Logic**: Validates dispense document selection before acceptance
**Error Prevention**: Prevents acceptance without proper dispense document selection

### Item Selection Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before acceptance
**Selection Logic**: Ensures item is selected from return items grid
**Error Prevention**: Prevents acceptance without proper item selection

### Rejection Reason Validation

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (cbReasons.Value == "" || cbReasons.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    // ... additional validation
}
```

**Rejection Reason Logic**: Validates rejection reason selection before rejection
**Error Prevention**: Prevents rejection without proper rejection reason selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Department Selection Validation**: Must select department before loading returns
- **Store Selection Validation**: Must select store before loading items
- **Financial Year Selection Validation**: Must select financial year before loading returns
- **Dispense Document Selection Validation**: Must select dispense document before loading items
- **Item Selection Validation**: Must select item from grid before acceptance
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Department Validation**: Ensures department is active and available
- **Store Validation**: Ensures store has active rules
- **Financial Year Validation**: Ensures financial year is active and available
- **Dispense Document Validation**: Ensures dispense document is valid and available
- **Item Availability Validation**: Ensures items have available quantities
- **Rejection Reason Validation**: Ensures rejection reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Acceptance Access**: Ensures user can access and modify acceptance records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Acceptance Success**: "تم قبول الارتجاع" (Return accepted successfully)
- **Rejection Success**: "تم رفض الارتجاع" (Return rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of return items grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Return Management System**
- **Database Tables**:
  - `Inventories_Internal_Return_Previous_years` - Internal return records for previous years
  - `Inventories_Dispense_Request_Details` - Dispense request detail records
  - `Inventories_Dispense_Request_Header` - Dispense request header records
- **Integration Details**:
  - Acceptance workflow controlled by department and dispense document selection
  - Return quantities tracked against available amounts
  - Acceptance records stored for return management
- **Data Flow**:
  - Returns filtered by department and dispense document
  - Return quantities validated against available limits
  - Acceptance records stored for return management

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
  - User authentication required for all acceptance operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock` - Stock records
- **Integration Details**:
  - Item information displayed for acceptance selection
  - Store availability tracked with batch-level detail
  - Unit information calculated based on item associations
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information calculated from unit associations

### Data Exchange

#### **Department and Store Information**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Inventories_wharehouse_store` - Store master data
- **Real-time Data**:
  - Department information for return filtering
  - Store information for item filtering
  - Item quantities and availability
- **Data Relationships**:
  - Departments linked to returns via department code
  - Stores linked to items via stock records
  - Acceptance records cleared after successful operations

#### **Item and Return Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Internal_Return_Previous_years` - Return records
- **Real-time Data**:
  - Item details and descriptions
  - Return information and quantities
  - Acceptance status and details
- **Data Relationships**:
  - Items linked to returns via item code
  - Return information displayed for acceptance items
  - Acceptance status tracked for each return

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار الادارة" Error**
- **Cause**: Department not selected before loading returns
- **Solution**: Always select department before loading returns
- **Prevention**: Department selection is required for all acceptance operations

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all acceptance operations

#### **"الرجاء اختيار السنة المالية" Error**
- **Cause**: Financial year not selected before loading returns
- **Solution**: Always select financial year before loading returns
- **Prevention**: Financial year selection is required for all acceptance operations

#### **"الرجاء اختيار رقم المستند الصرف" Error**
- **Cause**: Dispense document not selected before loading items
- **Solution**: Always select dispense document before loading items
- **Prevention**: Dispense document selection is required for all acceptance operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from grid before acceptance
- **Solution**: Always select item from grid before acceptance
- **Prevention**: Item selection is required for all acceptance operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **Acceptance Failed Error**
- **Cause**: Acceptance cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before acceptance

#### **Rejection Failed Error**
- **Cause**: Rejection cannot be processed
- **Solution**: Verify rejection reason is selected
- **Prevention**: Ensure proper validation before rejection

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Acceptance Access**: Access to acceptance operations
- **Store Access**: Access to stores with acceptance items
- **Return Access**: Access to returns with acceptance workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Acceptance Workflow**: Understanding of acceptance process
- **Department Management**: Knowledge of department selection and return filtering
- **Store Management**: Knowledge of store selection and item filtering
- **Return Management**: Familiarity with return selection and acceptance loading
- **Acceptance Management**: Understanding of acceptance save and rejection operations

## Usage Examples

### Basic Acceptance Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Department Selection**: Select department for return filtering
3. **Store Selection**: Select store for item filtering
4. **Financial Year Selection**: Select financial year for return filtering
5. **Dispense Document Selection**: Select dispense document for acceptance
6. **Item Review**: Review items in return items grid
7. **Item Selection**: Select specific items for acceptance
8. **Acceptance**: Click accept button to process acceptance
9. **Rejection**: Click reject button to process rejection with reason

### Return Item Management Workflow

1. **Department Selection**: Select department for return filtering
2. **Store Selection**: Select store for item filtering
3. **Financial Year Selection**: Select financial year for return filtering
4. **Dispense Document Selection**: Select dispense document for acceptance
5. **Item Review**: Review items in return items grid
6. **Item Selection**: Select specific items for acceptance
7. **Acceptance**: Process acceptance for selected items
8. **Rejection**: Process rejection for selected items with reason
9. **Completion**: Complete all acceptance operations

### Multi-Return Acceptance Management

1. **Department Selection**: Select department for return filtering
2. **Store Selection**: Select store for item filtering
3. **Financial Year Selection**: Select financial year for return filtering
4. **Dispense Document Review**: Review all dispense documents for selected department
5. **Selective Acceptance**: Accept specific returns as needed
6. **Selective Rejection**: Reject specific returns with reasons
7. **Return Validation**: Ensure all returns have proper validation
8. **Acceptance Completion**: Complete all acceptance operations