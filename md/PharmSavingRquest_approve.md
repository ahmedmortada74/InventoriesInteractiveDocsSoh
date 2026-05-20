← Go back to 
[Inventories Module Documentation](/Inventories)


# PharmSavingRquest_approve.aspx

## Overview

**File**: `\Inventories\Process\PharmSavingRquest_approve.aspx`
**Purpose**: Pharmaceutical saving request approval system for usage optimization review
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacy administrators, inventory managers, approval personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Document Filtering)**
- **Store Dropdown**: Must select valid store for document filtering
- **Error Prevention**: System validates store is selected before loading documents
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents document loading without store selection
- **Validation**: Only active stores are available

#### 2. **Document Selection (Required for Approval)**
- **Document Dropdown**: Must select valid document for approval
- **Error Prevention**: System validates document is selected before loading items
- **Data Source**: Inventories_Stock_saving_requested table with document information
- **Default Behavior**: User must select document manually
- **Error Message**: Validation prevents item loading without document selection
- **Validation**: Only documents with confirmation_done=1 and Approve_done=0 are available

#### 3. **Item Selection (Required for Approval)**
- **Item Grid Selection**: Must select valid items from request items
- **Error Prevention**: System validates items are selected before approval
- **Data Source**: Inventories_Stock_saving_requested table with request items
- **Default Behavior**: User must select items manually from grid
- **Error Message**: Validation prevents approval without item selection
- **Validation**: Only items with Approve_done=0 are available

#### 4. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason for rejection
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without rejection reason selection
- **Validation**: Only active rejection reasons with type=20 are available

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading documents
- **Error**: Store has no pending documents
- **Prevention**: Verify store has documents pending approval

#### **Document Selection Errors**
- **Error**: No document selected
- **Prevention**: Always select document before loading items
- **Error**: Document has no items pending approval
- **Prevention**: Verify document has items pending approval

#### **Item Selection Errors**
- **Error**: No items selected
- **Prevention**: Always select items before approval
- **Error**: Items already approved
- **Prevention**: Verify items are pending approval

#### **Approval and Rejection Errors**
- **Error**: Approval fails
- **Prevention**: Ensure items are selected before approval
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected before rejection
- **Error**: Rejection reason not selected
- **Prevention**: Always select rejection reason before rejection

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have approval permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Documents must be pending approval** for stores
5. **Items must be available** for approval

#### **Required System State**
- User authentication must be active
- Approval permissions must be configured
- Store data must be current
- Document data must be current
- Item data must be available

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper document loading
- ✅ Store selection enables document filtering

#### **For Document Selection**
- ✅ Document dropdown populated with pending documents only
- ✅ Document validation ensures proper item loading
- ✅ Document selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected document
- ✅ Item details show complete request information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Approval Management**
- ✅ Approval creates proper approval records
- ✅ Item selection enables approval workflow
- ✅ Approval workflow works with proper validation
- ✅ Approval completion provides success feedback

#### **For Rejection Management**
- ✅ Rejection creates proper rejection records
- ✅ Rejection reason selection enables rejection workflow
- ✅ Rejection workflow works with proper validation
- ✅ Rejection completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for pharmaceutical saving request approval

### Department and Employee Selection Section

```html
<!-- Department and Employee Selection -->
<dx:BootstrapLayoutGroup Caption="تأكيد مراجعة الاضافة -اعادة الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
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
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
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
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="inv_id" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="StoresPerDS" ValueField="code" TextField="english_name" OnSelectedIndexChanged="inv_id_SelectedIndexChanged">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="txt_doc_no1" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Stores_doc_no" ValueField="doc_id_saving" TextField="doc_id_saving" OnSelectedIndexChanged="txt_doc_no_SelectedIndexChanged">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn" Width="100%" Text="بحث" OnClick="search_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="id" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource2" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="Bootstrap_temp_reuse_SelectionChanged">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" SelectAllCheckboxMode="AllPages" Width="30px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="id" Caption="ID" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="StockDate" Caption="التاريخ" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="المخزن" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="الكود الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Purchase" Caption="الكمية بوحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_delivery" Caption="الكمية بوحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_storage" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Exchange" Caption="الكمية بوحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحيه" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_purchase" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_delivery" Caption="وحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_storage" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_exchange" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reused_number" Caption="عدد مرات توفير الاستخدام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit_usage" Caption="سعر الوحدة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="TotalPrice" Caption="اجمالى قيمة التوفير" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn2" Width="100%" Text="تأكيد المراجعة" OnClick="save_btn_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn2,'btn2'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn1" Width="100%" Text="رفض المراجعة" OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                        <CssClasses Icon="simple-icon-refresh" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Text="السبب" Width="100%" ID="BootstrapTextBox1"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="reject_txt" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15">
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

**Store Parameters**:
- `@code_doc` - Store ID for filtering documents
- `@stora_id_saving` - Store ID for filtering items

**Document Parameters**:
- `@doc_id_saving` - Document ID for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads documents based on selected store
3. **Document Selection**: Loads items based on selected document
4. **Item Selection**: Loads item information for selected items
5. **Approval**: Processes approval for selected items
6. **Rejection**: Processes rejection for selected items with reason

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default approval state
4. Initializes date displays

### inv_id_SelectedIndexChanged Method

```csharp
protected void inv_id_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads documents based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for document data source
3. Binds document dropdown
4. Updates store information display

### txt_doc_no_SelectedIndexChanged Method

```csharp
protected void txt_doc_no_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected document

**Process**:
1. Validates document selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates document information display

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Approves selected items

**Process**:
1. Validates item selection
2. Validates approval permissions
3. Updates item status to approved
4. Refreshes item grid
5. Provides success feedback

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected items with reason

**Process**:
1. Validates item selection
2. Validates rejection reason selection
3. Updates item status to rejected
4. Refreshes item grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, english_name, arabic_name, active, Store_type
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Stock_saving_requested**
- **Purpose**: Saving request records
- **Key Fields**: id, doc_id_saving, storeid, Itemcode, StockDate, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, Expiration_date, reused_number, Price_unit_usage, Approve_done, confirmation_done, active_status
- **Usage**: Tracks saving request items for approval
- **Filtering**: Only items with confirmation_done=1 and Approve_done=0

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for rejection
- **Filtering**: Only active reasons with type=20

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
**Validation**: Ensures user is authenticated before accessing approval data

#### **Store Filtering**
```sql
SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type 
FROM Inventories_wharehouse_store WS 
inner join Inventories_rules_stores on store_id = WS.id 
WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp and Store_type<>'1'
```

**Filtering Logic**: Shows only stores with active rules
**Permission Logic**: Only stores with active rules are available
**Validation**: Ensures store has approval items

#### **Document Filtering**
```sql
select distinct doc_id_saving from Inventories_Stock_saving_requested 
where Approve_done='0' and confirmation_done = 1 and active_status =1 and storeid=@code_doc
```

**Filtering Logic**: Shows only documents pending approval
**Permission Logic**: Only documents pending approval are available
**Validation**: Ensures document has items pending approval

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, document, and rejection reason dropdowns

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

#### **1. Department and Employee Selection Section**
```html
<!-- Department and Employee Selection -->
<dx:BootstrapLayoutGroup Caption="تأكيد مراجعة الاضافة -اعادة الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Request Items Grid Section**
```html
<!-- Request Items Grid -->
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
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
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

// Store Data Source
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and emp_id = @emp and Store_type<>'1'";

// Document Data Source
SqlDataSource Stores_doc_no = new SqlDataSource();
Stores_doc_no.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Stores_doc_no.SelectCommand = "select distinct doc_id_saving from Inventories_Stock_saving_requested where Approve_done='0' and confirmation_done = 1 and active_status =1 and storeid=@code_doc";

// Request Items Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select distinct Inventories_Stock_saving_requested.id, iss.arabic_name, format(StockDate,'yyyy-MM-dd') as StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, format(Expiration_date,'yyyy-MM-dd') as Expiration_date, Inventories_UOM.description, uom_delviery.description, uom_storage.description, uom_exchange.description, reused_number, Price_unit_usage, CAST((Price_unit_usage*reused_number) AS DECIMAL(10, 2)) as TotalPrice from Inventories_Stock_saving_requested inner join Inventories_UOM on Inventories_UOM.id=Inventories_Stock_saving_requested.ItemUnit_Purchase_Id inner join Inventories_UOM uom_delviery on uom_delviery.id=Inventories_Stock_saving_requested.ItemUnit_delivery_id inner join Inventories_UOM uom_storage on uom_storage.id=Inventories_Stock_saving_requested.ItemUnit_storage_Id inner join Inventories_UOM uom_exchange on uom_exchange.id=Inventories_Stock_saving_requested.ItemUnit_Exchange_id inner join Inventories_Item_Settings iss on iss.item_code=Inventories_Stock_saving_requested.Itemcode where doc_id_saving=@doc_id_saving and Approve_done='0' and storeid=@stora_id_saving";

// Rejection Reason Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=20";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void inv_id_SelectedIndexChanged(object sender, EventArgs e)
{
    if (inv_id.Value == "" || inv_id.Value == null)
    {
        // Clear document dropdown
        txt_doc_no1.DataSource = null;
        txt_doc_no1.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading documents
**Error Prevention**: Prevents document loading without store selection

### Document Selection Validation

```csharp
protected void txt_doc_no_SelectedIndexChanged(object sender, EventArgs e)
{
    if (txt_doc_no1.Value == "" || txt_doc_no1.Value == null)
    {
        // Clear item grid
        checkGridViewTemp.DataSource = null;
        checkGridViewTemp.DataBind();
        return;
    }
    // ... additional validation
}
```

**Document Logic**: Validates document selection before loading items
**Error Prevention**: Prevents item loading without document selection

### Item Selection Validation

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الاصناف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before approval
**Selection Logic**: Ensures items are selected from request items grid
**Error Prevention**: Prevents approval without proper item selection

### Rejection Reason Validation

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (reject_txt.Value == "" || reject_txt.Value == null)
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
- **Store Selection Validation**: Must select store before loading documents
- **Document Selection Validation**: Must select document before loading items
- **Item Selection Validation**: Must select items before approval
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Document Validation**: Ensures document is pending approval
- **Item Validation**: Ensures items are pending approval
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
- **Approval Success**: "تم تأكيد المراجعة" (Review confirmed successfully)
- **Rejection Success**: "تم رفض المراجعة" (Review rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of item grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Pharmacy Saving Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Stock_saving_requested` - Saving request records
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Reasons` - Rejection reason master data
- **Integration Details**:
  - Store selection controls document filtering
  - Document selection controls item display
  - Items displayed with complete details
  - Approval/rejection tracked with complete information
- **Data Flow**:
  - Stores filtered for user access
  - Documents filtered by store
  - Items filtered by document
  - Approval/rejection tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all approval operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Document Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Stock_saving_requested` - Saving request records
- **Real-time Data**:
  - Store information for filtering
  - Document information for approval
  - Item quantities and prices
- **Data Relationships**:
  - Stores linked to documents via storeid
  - Documents linked to items via doc_id_saving
  - Approval/rejection tracked by user

#### **Item and Approval Information**
- **Database Tables**:
  - `Inventories_Stock_saving_requested` - Saving request records
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Approval quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to approval via Itemcode
  - Approval tracked by document
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading documents
- **Solution**: Always select store before loading documents
- **Prevention**: Store selection is required for all approval operations

#### **"الرجاء اختيار المستند" Error**
- **Cause**: Document not selected before loading items
- **Solution**: Always select document before loading items
- **Prevention**: Document selection is required for all approval operations

#### **"الرجاء اختيار الاصناف" Error**
- **Cause**: Items not selected before approval
- **Solution**: Always select items before approval
- **Prevention**: Item selection is required for all approval operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **No Documents Found**
- **Cause**: Store has no documents pending approval
- **Solution**: Verify store has documents pending approval
- **Prevention**: Ensure stores have documents pending approval

#### **Approval Failed Error**
- **Cause**: Approval cannot be processed
- **Solution**: Verify items are selected before approval
- **Prevention**: Ensure proper validation before approval

#### **Rejection Failed Error**
- **Cause**: Rejection cannot be processed
- **Solution**: Verify rejection reason is selected before rejection
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

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Approval Workflow**: Understanding of approval process
- **Store Management**: Knowledge of store selection and filtering
- **Document Management**: Knowledge of document selection and approval
- **Approval Management**: Familiarity with approval save and rejection operations

## Usage Examples

### Basic Approval Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for document filtering
3. **Document Selection**: Select document for approval
4. **Item Review**: Review items in request items grid
5. **Item Selection**: Select specific items for approval
6. **Approval**: Click approve button to process approval
7. **Rejection**: Click reject button to process rejection with reason

### Rejection Workflow

1. **Store Selection**: Select store for document filtering
2. **Document Selection**: Select document for rejection
3. **Item Review**: Review items in request items grid
4. **Item Selection**: Select specific items for rejection
5. **Rejection Reason Selection**: Select rejection reason
6. **Rejection**: Click reject button to process rejection

### Multi-Item Approval Management

1. **Store Selection**: Select store for document filtering
2. **Document Selection**: Select document for approval
3. **Multiple Item Selection**: Select multiple items for approval
4. **Approval**: Process approval for all selected items
5. **Rejection**: Process rejection for selected items with reason
6. **Completion**: Complete all approval operations