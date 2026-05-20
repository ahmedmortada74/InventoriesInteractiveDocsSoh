← Go back to 
[Inventories Module Documentation](/Inventories)


# PharmSavingRquest_confirmation.aspx

## Overview

**File**: `\Inventories\Process\PharmSavingRquest_confirmation.aspx`
**Purpose**: Pharmaceutical saving request confirmation system for usage optimization review
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Pharmacy administrators, inventory managers, confirmation personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document Selection (Required for Confirmation)**
- **Document Dropdown**: Must select valid document for confirmation
- **Error Prevention**: System validates document is selected before loading items
- **Data Source**: Inventories_Stock_saving_requested table with document information
- **Default Behavior**: User must select document manually
- **Error Message**: Validation prevents item loading without document selection
- **Validation**: Only documents with confirmation_done=0 and active_status=1 are available

#### 2. **Item Review (Required for Confirmation)**
- **Item Grid Review**: Must review all items in request before confirmation
- **Error Prevention**: System displays all items for review before confirmation
- **Data Source**: Inventories_Stock_saving_requested table with request items
- **Default Behavior**: User must review items before confirmation
- **Error Message**: No validation required as this is review only
- **Validation**: All items displayed for review

#### 3. **Confirmation Action (Required for Confirmation)**
- **Confirm Button**: Must click confirm button to approve request
- **Error Prevention**: System validates confirmation action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click confirm button manually
- **Error Message**: Validation prevents confirmation without user action
- **Validation**: Confirmation action must be explicitly selected

#### 4. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason for rejection
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without rejection reason selection
- **Validation**: Only active rejection reasons with type=20 are available

### Common Error Scenarios and Prevention

#### **Document Selection Errors**
- **Error**: No document selected
- **Prevention**: Always select document before loading items
- **Error**: Document has no items pending confirmation
- **Prevention**: Verify document has items pending confirmation

#### **Confirmation Errors**
- **Error**: Confirmation fails
- **Prevention**: Ensure document is selected before confirmation
- **Error**: Items not reviewed
- **Prevention**: Review all items before confirmation

#### **Rejection Errors**
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected before rejection
- **Error**: Rejection reason not selected
- **Prevention**: Always select rejection reason before rejection

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have confirmation permissions** via employee group assignments
3. **Documents must be pending confirmation** in the system
4. **Items must be available** for confirmation

#### **Required System State**
- User authentication must be active
- Confirmation permissions must be configured
- Document data must be current
- Item data must be available

### Success Criteria

#### **For Document Selection**
- ✅ Document dropdown populated with pending documents only
- ✅ Document validation ensures proper item loading
- ✅ Document selection enables item display

#### **For Item Review**
- ✅ Item grid displays all items for selected document
- ✅ Item details show complete request information
- ✅ Review functionality works properly
- ✅ Total calculations are accurate

#### **For Confirmation Management**
- ✅ Confirmation creates proper confirmation records
- ✅ Document selection enables confirmation workflow
- ✅ Confirmation workflow works with proper validation
- ✅ Confirmation completion provides success feedback

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

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for pharmaceutical saving request confirmation

### Department and Document Selection Section

```html
<!-- Department and Document Selection -->
<dx:BootstrapLayoutGroup Caption="اعتماد الأضافة - توفير الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
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
                    <dx:BootstrapComboBox ID="rquest_return" runat="server" TextFormatString=" {0}" AutoPostBack="True" Enabled="true" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource1" ValueField="doc_id_saving" TextField="doc_id_saving">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="doc_id_saving" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" Visible="false" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text="بحث" OnClick="search_Click1">
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

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="BootstrapGridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="id" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource2" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="BootstrapGridView1_SelectionChanged">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior AllowSelectSingleRowOnly="false" ProcessSelectionChangedOnServer="false" ProcessFocusedRowChangedOnServer="false"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewTextColumn FieldName="id" Caption="id" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="StockDate" Caption="التاريخ" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="المخزن" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="الكود الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Purchase" Caption="الكمية بوحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_delivery" Caption="الكمية بوحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_storage" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Exchange" Caption="الكمية بوحدة الصرف" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="الدفعة" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحيه" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_purchase" Caption="وحدة الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_delivery" Caption="وحدة الاستلام" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_storage" Caption="وحدة التخزين" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description_exchange" Caption="وحدة الصرف" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="reused_number" Caption="الكميه الموفرة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit_usage" Caption="سعر الوحدة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="TotalPrice" Caption="اجمالى قيمة التوفير" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="doc_id_saving" Caption="رقم المستند" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
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

### Confirmation and Rejection Section

```html
<!-- Confirmation and Rejection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Adding" runat="server" ClientInstanceName="btn4" Width="100%" Text="اعتماد الإضافة" OnClick="Adding_Click1">
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
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Width="100%" Text="رفض الإضافة" OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
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

**Document Parameters**:
- `@PO_doc` - Document ID for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Selection**: Loads items based on selected document
3. **Item Review**: Displays all items for review
4. **Confirmation**: Processes confirmation for selected document
5. **Rejection**: Processes rejection for selected document with reason

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads document information
3. Sets default confirmation state
4. Initializes date displays

### search_Click1 Method

```csharp
protected void search_Click1(object sender, EventArgs e)
```

**Purpose**: Searches for items based on selected document

**Process**:
1. Validates document selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates document information display

### Adding_Click1 Method

```csharp
protected void Adding_Click1(object sender, EventArgs e)
```

**Purpose**: Confirms selected document

**Process**:
1. Validates document selection
2. Validates confirmation permissions
3. Updates document status to confirmed
4. Refreshes item grid
5. Provides success feedback

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected document with reason

**Process**:
1. Validates document selection
2. Validates rejection reason selection
3. Updates document status to rejected
4. Refreshes item grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department list for filtering
- **Filtering**: Only active departments

#### **Inventories_Stock_saving_requested**
- **Purpose**: Saving request records
- **Key Fields**: id, doc_id_saving, storeid, Itemcode, StockDate, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, Expiration_date, reused_number, Price_unit_usage, confirmation_done, active_status
- **Usage**: Tracks saving request items for confirmation
- **Filtering**: Only items with confirmation_done=0 and active_status=1

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
**Validation**: Ensures user is authenticated before accessing confirmation data

#### **Document Filtering**
```sql
select distinct doc_id_saving from Inventories_Stock_saving_requested 
where confirmation_done = 0 and active_status =1
```

**Filtering Logic**: Shows only documents pending confirmation
**Permission Logic**: Only documents pending confirmation are available
**Validation**: Ensures document has items pending confirmation

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to document and rejection reason dropdowns

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

#### **1. Department and Document Selection Section**
```html
<!-- Department and Document Selection -->
<dx:BootstrapLayoutGroup Caption="اعتماد الأضافة - توفير الاستخدام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" Visible="false" ColSpanMd="2">
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
                    <dx:BootstrapGridView ID="BootstrapGridView1" runat="server">
```

#### **3. Confirmation and Rejection Section**
```html
<!-- Confirmation and Rejection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
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

// Document Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select distinct doc_id_saving from Inventories_Stock_saving_requested where confirmation_done = 0 and active_status =1";

// Request Items Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select distinct Inventories_Stock_saving_requested.id, iss.arabic_name, format(StockDate,'yyyy-MM-dd') as StockDate, storeid, Itemcode, ItemUnit_Purchase_Id, ItemUnit_delivery_id, ItemUnit_storage_Id, ItemUnit_Exchange_id, Quantity_Purchase, Quantity_delivery, Quantity_storage, Quantity_Exchange, batch_no, format(Expiration_date,'yyyy-MM-dd') as Expiration_date, Inventories_UOM.description, uom_delviery.description, uom_storage.description, uom_exchange.description, reused_number, doc_id_saving, Price_unit_usage, CAST((Price_unit_usage*reused_number) AS DECIMAL(10, 2)) as TotalPrice from Inventories_Stock_saving_requested inner join Inventories_UOM on Inventories_UOM.id=Inventories_Stock_saving_requested.ItemUnit_Purchase_Id inner join Inventories_UOM uom_delviery on uom_delviery.id=Inventories_Stock_saving_requested.ItemUnit_delivery_id inner join Inventories_UOM uom_storage on uom_storage.id=Inventories_Stock_saving_requested.ItemUnit_storage_Id inner join Inventories_UOM uom_exchange on uom_exchange.id=Inventories_Stock_saving_requested.ItemUnit_Exchange_id inner join Inventories_Item_Settings iss on iss.item_code=Inventories_Stock_saving_requested.Itemcode where doc_id_saving=@PO_doc";

// Rejection Reason Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=20";
```

## Business Logic and Validation

### Document Selection Validation

```csharp
protected void search_Click1(object sender, EventArgs e)
{
    if (rquest_return.Value == "" || rquest_return.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند');", true);
        return;
    }
    // ... additional validation
}
```

**Document Logic**: Validates document selection before loading items
**Error Prevention**: Prevents item loading without document selection

### Confirmation Validation

```csharp
protected void Adding_Click1(object sender, EventArgs e)
{
    if (rquest_return.Value == "" || rquest_return.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم المستند');", true);
        return;
    }
    // ... additional validation
}
```

**Confirmation Logic**: Validates document selection before confirmation
**Error Prevention**: Prevents confirmation without document selection

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
**Error Prevention**: Prevents rejection without rejection reason selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Selection Validation**: Must select document before loading items
- **Confirmation Validation**: Must select document before confirmation
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Validation**: Ensures document is pending confirmation
- **Item Validation**: Ensures items are pending confirmation
- **Rejection Reason Validation**: Ensures rejection reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Document Access**: Ensures user has access to selected document
- **Confirmation Access**: Ensures user can access and modify confirmation records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Confirmation Success**: "تم اعتماد الإضافة" (Addition confirmed successfully)
- **Rejection Success**: "تم رفض الإضافة" (Addition rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of item grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Pharmacy Saving Management System**
- **Database Tables**:
  - `DefinitionDep` - Department master data
  - `Inventories_Stock_saving_requested` - Saving request records
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_Reasons` - Rejection reason master data
- **Integration Details**:
  - Document selection controls item display
  - Items displayed with complete details
  - Confirmation/rejection tracked with complete information
- **Data Flow**:
  - Documents filtered for user access
  - Items filtered by document
  - Confirmation/rejection tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all confirmation operations
  - Document access controlled by user permissions

### Data Exchange

#### **Document and Item Information**
- **Database Tables**:
  - `Inventories_Stock_saving_requested` - Saving request records
  - `Inventories_Item_Settings` - Item master data
- **Real-time Data**:
  - Document information for confirmation
  - Item quantities and prices
- **Data Relationships**:
  - Documents linked to items via doc_id_saving
  - Confirmation/rejection tracked by user

#### **Item and Confirmation Information**
- **Database Tables**:
  - `Inventories_Stock_saving_requested` - Saving request records
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Confirmation quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to confirmation via Itemcode
  - Confirmation tracked by document
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار رقم المستند" Error**
- **Cause**: Document not selected before loading items
- **Solution**: Always select document before loading items
- **Prevention**: Document selection is required for all confirmation operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **No Documents Found**
- **Cause**: No documents pending confirmation
- **Solution**: Verify documents are pending confirmation
- **Prevention**: Ensure documents are pending confirmation

#### **Confirmation Failed Error**
- **Cause**: Confirmation cannot be processed
- **Solution**: Verify document is selected before confirmation
- **Prevention**: Ensure proper validation before confirmation

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
- **Confirmation Access**: Access to confirmation operations
- **Document Access**: Access to documents with confirmation items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Confirmation Workflow**: Understanding of confirmation process
- **Document Management**: Knowledge of document selection and confirmation
- **Confirmation Management**: Familiarity with confirmation save and rejection operations

## Usage Examples

### Basic Confirmation Workflow

1. **Page Load**: Verify page loads with default data
2. **Document Selection**: Select document for confirmation
3. **Item Review**: Review items in request items grid
4. **Confirmation**: Click confirm button to process confirmation
5. **Rejection**: Click reject button to process rejection with reason

### Rejection Workflow

1. **Document Selection**: Select document for rejection
2. **Item Review**: Review items in request items grid
3. **Rejection Reason Selection**: Select rejection reason
4. **Rejection**: Click reject button to process rejection

### Multi-Document Confirmation Management

1. **Document Selection**: Select document for confirmation
2. **Item Review**: Review items for selected document
3. **Confirmation**: Process confirmation for selected document
4. **Rejection**: Process rejection for selected document with reason
5. **Completion**: Complete all confirmation operations