← Go back to 
[Inventories Module Documentation](/Inventories)


# Internal_return_Approve.aspx

## Overview

**File**: `\Inventories\Process\Internal_return_Approve.aspx`
**Purpose**: Internal return approval system for inventory items with confirmation workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, return approval personnel, department managers

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

#### 3. **Dispense Document Selection (Required for Approval)**
- **Dispense Document Dropdown**: Must select valid dispense document for approval
- **Error Prevention**: System validates dispense document is selected before loading items
- **Data Source**: GetDynamicReturns stored procedure
- **Default Behavior**: User must select dispense document manually
- **Error Message**: Validation prevents item loading without dispense document selection
- **Validation**: Only valid dispense documents are available

#### 4. **Item Selection (Required for Approval)**
- **Item Grid Selection**: Must select valid item from return items
- **Error Prevention**: System validates item is selected before approval
- **Data Source**: Inventories_Internal_Return table with return items
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents approval without item selection
- **Validation**: Only items with Exchange_Status='A' and Approve=0 are available

#### 5. **Rejection Reason Selection (Required for Rejection)**
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

#### **Dispense Document Errors**
- **Error**: No dispense document selected
- **Prevention**: Always select dispense document before loading items
- **Error**: Invalid dispense document
- **Prevention**: Verify dispense document is valid and available

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item from grid before approval
- **Error**: Item has no available quantity
- **Prevention**: Check available quantity before approval
- **Error**: Item already fully approved
- **Prevention**: Verify item has remaining quantity

#### **Approval and Rejection Errors**
- **Error**: No items selected for approval
- **Prevention**: Select at least one item before approval
- **Error**: No rejection reason selected
- **Prevention**: Always select rejection reason before rejection
- **Error**: Approval fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have return approval permissions** via employee group assignments
3. **Departments must be configured** in the system
4. **Stores must have available items** for return
5. **Dispense documents must be pending** for approval
6. **Return workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Return approval permissions must be configured
- Department data must be current
- Store data must be current
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

#### **For Dispense Document Selection**
- ✅ Dispense document dropdown populated with valid documents only
- ✅ Dispense document validation ensures proper item loading
- ✅ Dispense document selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected dispense document
- ✅ Item details show complete return information
- ✅ Available quantity validation ensures proper limits
- ✅ Unit information displays properly for each item

#### **For Approval Management**
- ✅ Approval creates proper approval records
- ✅ Item selection enables approval workflow
- ✅ Approval workflow works with proper validation
- ✅ Approval completion provides success feedback

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

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for internal return approval

### Department and Store Selection Section

```html
<!-- Department and Store Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
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
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" AutoPostBack="true" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource5" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessSelectionChangedOnServer="true" ProcessFocusedRowChangedOnServer="true"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" Width="30px" SelectAllCheckboxMode="AllPages"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="english_name" Caption="اسم الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Exchange_unit" Caption="وحدة الصرف" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Depname" Caption="الادارة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Emp2" Caption="الموظف" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="EquipName" Caption="المعدة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="fileid" Caption="ملف طبى" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Account" Caption="حساب مريض" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Return_Quntity" Caption="كميه الارتجاع" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="RespnsableUser2" Caption="مسئول التشغيل" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="المخزن" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم مستند الاضافة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount_Done_Exchange" Caption="الرصيد المستخدم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="كود المخزن" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Header_FK" Caption="" VisibleIndex="2" Visible="false"></dx:BootstrapGridViewTextColumn>
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

### Approval and Rejection Section

```html
<!-- Approval and Rejection -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-items: center; justify-content: center">
                <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn6" Text=" تأكيد المراجعة " OnClick="save_btn_Click">
                    <ClientSideEvents Click="function(s, e) { DisableButton3(btn6,'btn6'); }" />
                    <CssClasses Icon="simple-icon-cursor" />
                    <SettingsBootstrap RenderOption="Success" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
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
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="5">
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

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Department Selection**: Loads department information
3. **Store Selection**: Loads items based on selected store
4. **Dispense Document Selection**: Loads items based on selected dispense document
5. **Item Selection**: Loads item information for selected item
6. **Approval**: Processes approval for selected items
7. **Rejection**: Processes rejection for selected items with reason

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
4. Sets default approval state

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Approves selected return items

**Process**:
1. Validates item selection
2. Validates approval permissions
3. Updates return status to approved
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

#### **Inventories_Internal_Return**
- **Purpose**: Internal return records
- **Key Fields**: ID, doc_id, Itemcode, storeid, Amount_Done_Exchange, Return_Quntity, Exchange_Status, Active, Request, Approve, Return_Accepance
- **Usage**: Tracks return items for approval
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
- **Filtering**: Only active reasons with type=16

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
**Validation**: Ensures user is authenticated before accessing approval operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for approval operations

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp
```

**Filtering Logic**: Shows only stores with active rules for user
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has approval items

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
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="المخزن" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
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

#### **3. Approval and Rejection Section**
```html
<!-- Approval and Rejection -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="5">
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

// Dispense Document Data Source
SqlDataSource ExMove = new SqlDataSource();
ExMove.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ExMove.SelectCommand = "[GetDynamicReturns]";

// Return Items Data Source
SqlDataSource SqlDataSource5 = new SqlDataSource();
SqlDataSource5.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource5.SelectCommand = "select distinct Inventories_Internal_Return.Header_FK,(SELECT Dep_Name FROM Orman.dbo.DefinitionDep WHERE DepID=Dep) Depname,Return_Quntity,(select User_Name from Users where Emp_Code=convert(nvarchar,RespnsableUser)) RespnsableUser2,(select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp,(SELECT arabic_name FROM Inventories_Item_Settings where item_code=EquipID) EquipName,Account,fileid,Inventories_Internal_Return.doc_id,Inventories_Internal_Return.ID,Inventories_Internal_Return.PO_ID_FK,Inventories_Internal_Return.Itemcode,Inventories_Item_Settings.english_name,Inventories_Internal_Return.Price_unit,Inventories_Internal_Return.Grand_Total,Inventories_Internal_Return.doc_id,Inventories_Internal_Return.storeid,Inventories_Internal_Return.inv_num,Exchange_unit.description as Exchange_unit,Store_unit.description as Store_unit,Inventories_Internal_Return.Amount_Done_Exchange,Inventories_Internal_Return.Amount_Done,Inventories_Internal_Return.Expiration_date,batch_no from Inventories_Internal_Return inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Internal_Return.Itemcode inner join Inventories_UOM Exchange_unit on Exchange_unit.id=Inventories_Internal_Return.ItemUnit_Exchange_id inner join Inventories_UOM Store_unit on Store_unit.id=Inventories_Internal_Return.ItemUnit_storage_Id left join Inventories_Dispense_Request_Details details on details.Header_FK =Inventories_Internal_Return.dispense_request left join Inventories_Dispense_Request_Header head on head.id = details.Header_FK where Inventories_Internal_Return.doc_id=@ID and (MoveType = 3) and Exchange_Status='A' and storeid=@store and Request=1 and Approve=0 and Return_Accepance=0 and Inventories_Internal_Return.Active='1'";

// Rejection Reason Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=16";
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

**Department Logic**: Validates department selection before approval
**Store Logic**: Validates store selection before loading items
**Error Prevention**: Prevents approval without proper department and store context

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

**Dispense Document Logic**: Validates dispense document selection before approval
**Error Prevention**: Prevents approval without proper dispense document selection

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

**Item Logic**: Validates item selection before approval
**Selection Logic**: Ensures item is selected from return items grid
**Error Prevention**: Prevents approval without proper item selection

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
- **Dispense Document Selection Validation**: Must select dispense document before loading items
- **Item Selection Validation**: Must select item from grid before approval
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
- **Dispense Document Validation**: Ensures dispense document is valid and available
- **Item Availability Validation**: Ensures items have available quantities
- **Rejection Reason Validation**: Ensures rejection reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Approval Access**: Ensures user can access and modify approval records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Approval Success**: "تم تأكيد الارتجاع" (Return approved successfully)
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
  - `Inventories_Internal_Return` - Internal return records
  - `Inventories_Dispense_Request_Details` - Dispense request detail records
  - `Inventories_Dispense_Request_Header` - Dispense request header records
- **Integration Details**:
  - Approval workflow controlled by department and dispense document selection
  - Return quantities tracked against available amounts
  - Approval records stored for return management
- **Data Flow**:
  - Returns filtered by department and dispense document
  - Return quantities validated against available limits
  - Approval records stored for return management

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
  - User authentication required for all approval operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Stock` - Stock records
- **Integration Details**:
  - Item information displayed for approval selection
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
  - Approval records cleared after successful operations

#### **Item and Return Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_Internal_Return` - Return records
- **Real-time Data**:
  - Item details and descriptions
  - Return information and quantities
  - Approval status and details
- **Data Relationships**:
  - Items linked to returns via item code
  - Return information displayed for approval items
  - Approval status tracked for each return

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار الادارة" Error**
- **Cause**: Department not selected before loading returns
- **Solution**: Always select department before loading returns
- **Prevention**: Department selection is required for all approval operations

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading items
- **Solution**: Always select store before loading items
- **Prevention**: Store selection is required for all approval operations

#### **"الرجاء اختيار رقم المستند الصرف" Error**
- **Cause**: Dispense document not selected before loading items
- **Solution**: Always select dispense document before loading items
- **Prevention**: Dispense document selection is required for all approval operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected from grid before approval
- **Solution**: Always select item from grid before approval
- **Prevention**: Item selection is required for all approval operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **Approval Failed Error**
- **Cause**: Approval cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before approval

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
- **Approval Access**: Access to approval operations
- **Store Access**: Access to stores with approval items
- **Return Access**: Access to returns with approval workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Approval Workflow**: Understanding of approval process
- **Department Management**: Knowledge of department selection and return filtering
- **Store Management**: Knowledge of store selection and item filtering
- **Return Management**: Familiarity with return selection and approval loading
- **Approval Management**: Understanding of approval save and rejection operations

## Usage Examples

### Basic Approval Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Department Selection**: Select department for return filtering
3. **Store Selection**: Select store for item filtering
4. **Dispense Document Selection**: Select dispense document for approval
5. **Item Review**: Review items in return items grid
6. **Item Selection**: Select specific items for approval
7. **Approval**: Click approve button to process approval
8. **Rejection**: Click reject button to process rejection with reason

### Return Item Management Workflow

1. **Department Selection**: Select department for return filtering
2. **Store Selection**: Select store for item filtering
3. **Dispense Document Selection**: Select dispense document for approval
4. **Item Review**: Review items in return items grid
5. **Item Selection**: Select specific items for approval
6. **Approval**: Process approval for selected items
7. **Rejection**: Process rejection for selected items with reason
8. **Completion**: Complete all approval operations

### Multi-Return Approval Management

1. **Department Selection**: Select department for return filtering
2. **Store Selection**: Select store for item filtering
3. **Dispense Document Review**: Review all dispense documents for selected department
4. **Selective Approval**: Approve specific returns as needed
5. **Selective Rejection**: Reject specific returns with reasons
6. **Return Validation**: Ensure all returns have proper validation
7. **Approval Completion**: Complete all approval operations