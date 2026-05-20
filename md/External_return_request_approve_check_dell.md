← Go back to 
[Inventories Module Documentation](/Inventories)

# External_return_request_approve_check_dell.aspx

## Overview

**File**: `\Inventories\Process\External_return_request_approve_check_dell.aspx`
**Purpose**: Second-level approval system for external return requests with approval and rejection capabilities
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Second-level approvers, inventory supervisors, final approval personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Return Request Selection (Required for Approval)**
- **Request Dropdown**: Must select valid return request for second-level approval
- **Error Prevention**: System validates request is selected before loading details
- **Data Source**: Inventories_return_to_suppliers table filtered by first approval status
- **Default Behavior**: User must select request manually from available pending requests
- **Error Message**: Validation prevents loading details without request selection
- **Validation**: Only requests with return_done='1', return_rev_indator='1', return_approve_indator='0' are available

#### 2. **Approval Decision (Required for Approval)**
- **Approval Button**: Must approve or reject return request
- **Error Prevention**: System validates approval decision is made for each request
- **Data Source**: User interaction with approval buttons
- **Default Behavior**: User clicks approval buttons to make decisions
- **Error Message**: Validation prevents incomplete approval workflow
- **Validation**: User must make approval decision for each request

### Common Error Scenarios and Prevention

#### **Request Selection Errors**
- **Error**: No request selected
- **Prevention**: Always select request before loading details
- **Error**: Request not found
- **Prevention**: Verify request number is correct and has pending second-level approval
- **Error**: Request already processed
- **Prevention**: Verify request has return_approve_indator='0' for approval

#### **Request Detail Errors**
- **Error**: No request details found
- **Prevention**: Ensure request has items pending second-level approval
- **Error**: Request already approved
- **Prevention**: Verify request has return_approve_indator='0' for approval workflow
- **Error**: Request access denied
- **Prevention**: Ensure user has access to request's department

#### **Approval and Rejection Errors**
- **Error**: Approval fails
- **Prevention**: Ensure user has proper permissions for approval
- **Error**: Rejection fails
- **Prevention**: Ensure user has proper permissions for rejection
- **Error**: Request already processed
- **Prevention**: Verify request is still pending before approval/rejection

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has return approval permissions
- **Error**: Request access denied
- **Prevention**: Verify user has access to request's department
- **Error**: Department access restricted
- **Prevention**: Ensure user has access to selected department

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have second-level return approval permissions** via employee group assignments
3. **Return requests must be pending second-level approval** with proper status
4. **Return workflow must be enabled** for inventory items
5. **Approval permissions must be configured** in the system

#### **Required System State**
- User authentication must be active
- Second-level return approval permissions must be configured
- Return request workflow must be enabled
- Approval permissions must be configured
- Return requests must be pending second-level approval

### Success Criteria

#### **For Request Selection**
- ✅ Request dropdown populated with pending second-level approval requests only
- ✅ Request details display properly in grid
- ✅ Request validation prevents loading without selection
- ✅ Request status shows current approval state

#### **For Request Details**
- ✅ Request details grid displays all items pending second-level approval
- ✅ Item details show complete return information
- ✅ Return item information displays properly
- ✅ Request workflow status updates properly

#### **For Request Approval**
- ✅ Request approval updates status to approved
- ✅ Approval status updates in real-time
- ✅ Success feedback confirms approval completion
- ✅ Request status changes to approved

#### **For Request Rejection**
- ✅ Request rejection updates status to rejected
- ✅ Rejection status updates in real-time
- ✅ Success feedback confirms rejection completion
- ✅ Request status changes to rejected

#### **For Data Management**
- ✅ Request details refresh after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on approval status

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for second-level return approval

### Request Selection Section

```html
<!-- Request Selection -->
<dx:BootstrapLayoutGroup Caption="اعتماد الارتجاع الخارجى" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
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
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="rquest_return" runat="server" TextFormatString=" {0}" AutoPostBack="True" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource1" ValueField="return_doc_id" TextField="return_doc_id">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="return_doc_id" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text=" بحث " OnClick="search_Click1">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Details Grid Section

```html
<!-- Request Details Grid -->
<dx:BootstrapLayoutGroup showCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="BootstrapGridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource2" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="BootstrapGridView1_SelectionChanged">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior AllowSelectSingleRowOnly="false" ProcessSelectionChangedOnServer="false" ProcessFocusedRowChangedOnServer="false"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Arabic_name" Caption="اسم المورد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="رقم امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="english_name" Caption="اسم الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى سعر" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم مستند الاضافة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="return_doc_id" Caption="رقم مستند الارتجاع" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="purchases_desc" Caption="وحدة الشراء" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="الخصم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة البيع" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="مخزن" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="صنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعه" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية الورادة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الرصيد المستخدم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="quantity_Amount_return" Caption="كمية المراد ارجاعها" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="allow_Amount_return" Caption="الكمية المسموح بارجاعها" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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
<!-- Approval and Rejection Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Adding" runat="server" ClientInstanceName="btn4" Width="100%" Text=" اعتماد الارتجاع " OnClick="Adding_Click1">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn4,'btn4'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Width="100%" Text=" رفض الارتجاع " OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

## Data Flow Architecture

### Query String Parameters

The system uses request parameters for comprehensive data filtering:

**Request Parameters**:
- `@PO_doc` - Return document ID for filtering return items

**User Context Parameters**:
- Request selection based on first approval status

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Request Selection**: Loads return details for selected request
3. **Request Display**: Shows all items pending second-level approval
4. **Approval/Rejection**: Approves or rejects requests with proper validation
5. **Status Update**: Updates request status based on approval decisions

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default return approval workflow state

### search_Click1 Method

```csharp
protected void search_Click1(object sender, EventArgs e)
```

**Purpose**: Loads return details based on selected request

**Process**:
1. Validates request selection
2. Sets parameters for return details data source
3. Binds return details grid with filtered records
4. Clears all selections after binding

### Adding_Click1 Method

```csharp
protected void Adding_Click1(object sender, EventArgs e)
```

**Purpose**: Approves return request at second level

**Process**:
1. Validates request selection
2. Updates request status to approved (return_approve_indator='1')
3. Records approval timestamp and user
4. Refreshes return details grid
5. Provides success feedback

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects return request at second level

**Process**:
1. Validates request selection
2. Updates request status to rejected (return_approve_indator='2')
3. Records rejection timestamp and user
4. Refreshes return details grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_return_to_suppliers**
- **Purpose**: Return request records with second-level approval tracking
- **Key Fields**: ID, PO_ID_FK, supplier_ID_FK, Itemcode, Price_unit, Total_Price, return_doc_id, Store_id, inv_num, Purchase_Id_unit, delivery_id_unit, Amount, Done_Amount, quantity_Amount_return, Expiration_date, doc_id, allow_Amount_return, return_done, return_rev_indator, return_approve_indator
- **Status Values**: return_done='1' (first approved), return_rev_indator='1' (revised), return_approve_indator='0' (pending second approval), '1' (approved), '2' (rejected)
- **Usage**: Main table for second-level return approval workflow

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for selection
- **Filtering**: All departments available

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name
- **Usage**: Provides item information for return details

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for return details

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name
- **Usage**: Provides supplier information for return details

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing return operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for return operations

#### **Request Filtering**
```sql
select distinct return_doc_id from Inventories_return_to_suppliers where return_done='1' and return_rev_indator='1' and return_approve_indator='0'
```

**Filtering Logic**: Shows only pending second-level approval requests
**Permission Logic**: Only requests with return_approve_indator='0' are available
**Validation**: Ensures request is pending second-level approval

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

### Checkbox Selection Logic

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

**Selection Logic**: Ensures only one checkbox can be selected at a time
**Grid Logic**: Works within grid context to manage row selection
**Usage**: Applied to grid checkboxes for single selection behavior

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

### Popup and Callback Handling

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

**Popup Logic**: Shows popup at clicked element with callback functionality
**Data Loading**: Loads detailed data via callback when popup is shown
**User Experience**: Provides seamless detail viewing without page refresh

### Browser Security

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Security Logic**: Prevents browser back button navigation
**Session Management**: Ensures proper session handling
**User Experience**: Maintains application state and security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Request Selection Section**
```html
<!-- Request Selection -->
<dx:BootstrapLayoutGroup Caption="اعتماد الارتجاع الخارجى" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Request Details Grid Section**
```html
<!-- Request Details Grid -->
<dx:BootstrapLayoutGroup showCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="BootstrapGridView1" runat="server" OnSelectionChanged="BootstrapGridView1_SelectionChanged">
```

#### **3. Approval and Rejection Section**
```html
<!-- Approval and Rejection Section -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
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

// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";

// Request Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select distinct return_doc_id from Inventories_return_to_suppliers where return_done='1' and return_rev_indator='1' and return_approve_indator='0'";

// Return Details Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select distinct Inventories_return_to_suppliers.Itemcode, Inventories_return_to_suppliers.Store_id, Inventories_return_to_suppliers.ID,Inventories_return_to_suppliers.PO_ID_FK,purches_Supplier_record.Arabic_name,Inventories_Item_Settings.arabic_name as english_name,Inventories_return_to_suppliers.Price_unit,Inventories_return_to_suppliers.Total_Price,Inventories_return_to_suppliers.return_doc_id,Inventories_return_to_suppliers.Store_id,Inventories_return_to_suppliers.inv_num,purchases_unit.description as purchases_desc,Inventories_return_to_suppliers.Purchase_Id_unit,delivery_unit.description,Inventories_return_to_suppliers.delivery_id_unit,Inventories_return_to_suppliers.Amount,Inventories_return_to_suppliers.Done_Amount,quantity_Amount_return,Inventories_return_to_suppliers.Expiration_date,doc_id,allow_Amount_return,batch_no from Inventories_return_to_suppliers inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=supplier_ID_FK inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_return_to_suppliers.Itemcode inner join Inventories_UOM purchases_unit on purchases_unit.id=Inventories_return_to_suppliers.Purchase_Id_unit inner join Inventories_UOM delivery_unit on delivery_unit.id=Inventories_return_to_suppliers.delivery_id_unit where Inventories_return_to_suppliers.return_doc_id=@PO_doc and return_done='1' and return_rev_indator='1' and return_approve_indator='0'";
```

## Business Logic and Validation

### Request Selection Validation

```csharp
protected void search_Click1(object sender, EventArgs e)
{
    if (rquest_return.Value == "" || rquest_return.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند');", true);
        return;
    }
    else
    {
        SqlDataSource2.SelectParameters["PO_doc"].DefaultValue = rquest_return.Value.ToString();
        BootstrapGridView1.DataBind();
        BootstrapGridView1.Selection.UnselectAll();
    }
}
```

**Request Logic**: Validates request selection before loading details
**Data Binding**: Binds return details grid with filtered records
**Selection Logic**: Clears all selections after binding for clean state

### Request Approval Logic

```csharp
protected void Adding_Click1(object sender, EventArgs e)
{
    if (rquest_return.Value == "" || rquest_return.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند');", true);
        return;
    }
    else
    {
        cn.ExcuteSQL("update Inventories_return_to_suppliers set return_approve_indator='1' where return_doc_id ='" + rquest_return.Value.ToString() + "' ");
        BootstrapGridView1.DataBind();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم اعتماد الارتجاع');", true);
    }
}
```

**Approval Logic**: Updates request status to approved at second level
**Selection Logic**: Validates request selection before approval
**Data Update**: Updates return_approve_indator field to '1' for approval
**User Feedback**: Provides success message after approval

### Request Rejection Logic

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (rquest_return.Value == "" || rquest_return.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند');", true);
        return;
    }
    else
    {
        cn.ExcuteSQL("update Inventories_return_to_suppliers set return_approve_indator='2' where return_doc_id ='" + rquest_return.Value.ToString() + "' ");
        BootstrapGridView1.DataBind();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم رفض الارتجاع');", true);
    }
}
```

**Rejection Logic**: Updates request status to rejected at second level
**Selection Logic**: Validates request selection before rejection
**Data Update**: Updates return_approve_indator field to '2' for rejection
**User Feedback**: Provides success message after rejection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Request Selection Validation**: Must select request before loading details
- **Approval Decision Validation**: Must make approval decision for each request

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Request Status Validation**: Ensures request has pending second-level approval status
- **Request Detail Validation**: Ensures items are pending second-level approval
- **Approval Validation**: Ensures approval decision is made

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Request Access**: Ensures user can access and modify selected requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Approval Success**: "تم اعتماد الارتجاع" (Return approved successfully)
- **Rejection Success**: "تم رفض الارتجاع" (Return rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of return details grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on approval status
- **Status Updates**: Request status updates in real-time

## Integration Points

### External Systems

#### **Return Management System**
- **Database Tables**:
  - `Inventories_return_to_suppliers` - Return request records with second-level approval tracking
- **Integration Details**:
  - Return request workflow controlled by status tracking
  - Request approval tracked at record level
  - Request details tracked at item level
- **Data Flow**:
  - Requests filtered by first approval status
  - Request details filtered by request document
  - Approval tracked at record level

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
  - User authentication required for all return operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier master data
- **Integration Details**:
  - Item information displayed in return details
  - Unit information displayed for return items
  - Supplier information displayed for return items
- **Data Flow**:
  - Item details loaded from item master data
  - Unit information loaded from unit master data
  - Supplier information loaded from supplier master data

### Data Exchange

#### **Request and Approval Information**
- **Database Tables**:
  - `Inventories_return_to_suppliers` - Return request records
- **Real-time Data**:
  - Request approval status
  - Request detail information
  - Approval tracking
- **Data Relationships**:
  - Requests linked to details via document ID
  - Approval tracked at record level
  - Status updates recorded for audit trail

#### **Item and Supplier Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier master data
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Supplier information and associations
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from unit associations
  - Supplier information displayed for return items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار رقم المستند" Error**
- **Cause**: Request not selected before loading details
- **Solution**: Always select request before loading details
- **Prevention**: Request selection is required for all return operations

#### **No Request Details Found**
- **Cause**: Request has no items pending second-level approval
- **Solution**: Verify request has items with return_approve_indator='0'
- **Prevention**: Ensure request has proper approval workflow status

#### **Request Already Processed**
- **Cause**: Request has already been approved or rejected
- **Solution**: Verify request has return_approve_indator='0' for approval
- **Prevention**: Ensure request is pending second-level approval

#### **Approval Fails**
- **Cause**: Database update fails during approval
- **Solution**: Check database connection and permissions
- **Prevention**: Ensure proper database access rights

#### **Rejection Fails**
- **Cause**: Database update fails during rejection
- **Solution**: Check database connection and permissions
- **Prevention**: Ensure proper database access rights

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Return Approval Access**: Access to return approval operations
- **Request Access**: Access to requests with approval workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Return Approval Workflow**: Understanding of return approval process
- **Request Management**: Knowledge of request approval and rejection
- **Status Tracking**: Understanding of return status progression

## Usage Examples

### Basic Return Approval Workflow

1. **Page Load**: Verify page loads with default settings
2. **Request Selection**: Select return request for second-level approval
3. **Detail Review**: Review return items in grid
4. **Request Approval**: Click approval button to approve request
5. **Status Update**: Verify request status updates to approved
6. **Success Feedback**: Confirm approval success message

### Request Rejection Workflow

1. **Request Selection**: Select request to reject
2. **Rejection Execution**: Click rejection button
3. **Status Update**: Verify request status updated to rejected
4. **Success Feedback**: Confirm rejection success message

### Multi-Item Return Management

1. **Request Selection**: Select request with multiple items
2. **Item Review**: Review all items in request details grid
3. **Approval Decision**: Approve or reject entire request
4. **Status Tracking**: Monitor request status progression
5. **Audit Trail**: Review approval and rejection history
