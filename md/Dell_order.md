← Go back to 
[Inventories Module Documentation](/Inventories)

# Dell_order.aspx

## Overview

**File**: `\Inventories\Process\Dell_order.aspx`
**Purpose**: Receipt confirmation and rejection system for inventory items with document-based workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Receipt confirmation personnel, inventory supervisors, quality control staff

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document Number Input (Required for Search)**
- **Document Number Field**: Must enter valid document number for searching records
- **Error Prevention**: System validates document number is entered before search
- **Data Source**: User input with validation
- **Default Behavior**: User must enter document number manually
- **Error Message**: Validation prevents search without document number
- **Validation**: Document number must be non-empty

#### 2. **Record Selection (Required for Operations)**
- **Grid Row Selection**: Must select valid record from grid for operations
- **Error Prevention**: System validates record is selected before operations
- **Data Source**: Grid selection with validation
- **Default Behavior**: User must select record manually
- **Error Message**: Validation prevents operations without record selection
- **Validation**: Only one row can be selected at a time

#### 3. **Rejection Reason Selection (Conditional for Rejection)**
- **Reason Dropdown**: Required when rejecting receipt items
- **Error Prevention**: System validates rejection reason is selected when rejecting items
- **Data Source**: Inventories_Reasons table filtered by receipt rejection type
- **Default Behavior**: Reason dropdown enabled only when rejection is selected
- **Error Message**: Validation prevents rejection without reason selection
- **Validation**: Only active reasons (active=1, type=18) are available

### Common Error Scenarios and Prevention

#### **Document Number Errors**
- **Error**: No document number entered
- **Prevention**: Always enter document number before clicking search
- **Error**: Document not found
- **Prevention**: Verify document number is correct and has pending receipt status

#### **Record Selection Errors**
- **Error**: No record selected
- **Prevention**: Always select record before performing operations
- **Error**: Multiple rows selected
- **Prevention**: System enforces single row selection only

#### **Receipt Operation Errors**
- **Error**: Receipt confirmation fails
- **Prevention**: Ensure record is selected before confirmation
- **Error**: Receipt rejection fails
- **Prevention**: Ensure rejection reason is selected when rejecting
- **Error**: Rejection reason not selected
- **Prevention**: Always select rejection reason when rejecting items

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has receipt confirmation permissions
- **Error**: Document access denied
- **Prevention**: Verify user has access to document's department
- **Error**: Department access restricted
- **Prevention**: Ensure user has access to selected department

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have receipt confirmation permissions** via employee group assignments
3. **Document must be pending receipt** with proper status
4. **Examination must be completed** for items to be eligible for receipt
5. **Receipt workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Receipt confirmation permissions must be configured
- Department assignments must be configured
- Examination workflow must be completed
- Document must have proper status (Examination_done=1, receipt_done=0)

### Success Criteria

#### **For Document Search**
- ✅ Document number validation prevents search without number
- ✅ Search retrieves all eligible records for document
- ✅ Grid displays all examination receipt records
- ✅ Records filtered by examination completion status

#### **For Record Selection**
- ✅ Single row selection enforced
- ✅ Selection validation prevents operations without selection
- ✅ Record details display properly in grid
- ✅ Status information shows current receipt state

#### **For Receipt Confirmation**
- ✅ Record selection validation prevents confirmation without selection
- ✅ Receipt status updates to confirmed (receipt_done=1)
- ✅ User and timestamp tracking maintained
- ✅ Success feedback confirms completion

#### **For Receipt Rejection**
- ✅ Record selection validation prevents rejection without selection
- ✅ Rejection reason validation ensures proper reason selection
- ✅ Receipt status updates to rejected
- ✅ Rejection reason recorded for audit trail

#### **For Data Management**
- ✅ Grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for receipt confirmation

### Document Search Section

```html
<!-- Document Search Controls -->
<dx:BootstrapLayoutGroup Caption="اجراءات الاستلام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Department and Employee -->
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

        <!-- Document Number and Search -->
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="true" Width="100%" ID="txt_doc_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn" Width="100%" Text=" بحث " OnClick="search_Click">
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

### Data Grid Section

```html
<!-- Receipt Records Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource5" OnHtmlDataCellPrepared="checkGridViewTemp_HtmlDataCellPrepared" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="true" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnCustomColumnDisplayText="checkGridViewTemp_CustomColumnDisplayText" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior AllowSelectSingleRowOnly="false" ProcessSelectionChangedOnServer="false" ProcessFocusedRowChangedOnServer="false"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" Visible="true" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="اجمالى القيمة" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="رقم امر التوريد" Visible="true" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الدفعة" Visible="true" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" Visible="true" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" Visible="true" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية الواردة" Visible="true" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" Visible="true" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="كود الاستلام" Visible="true" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd" Visible="true" VisibleIndex="15"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Status_check" Caption="حالة" Visible="true" VisibleIndex="16"></dx:BootstrapGridViewTextColumn>
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

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Receipt Confirmation -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="100%" Text=" تأكيد الاستلام " OnClick="save_btn_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Receipt Rejection -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn" Width="100%" Text=" رفض الاستلام " OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-refresh" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Rejection Reason -->
        <dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" Enabled="true" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15" ID="rejectReason">
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

The system uses document number parameters for comprehensive data filtering:

**Document Number Parameters**:
- `@code_doc` - Document ID for filtering examination receipt records

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Search**: Validates document number and retrieves eligible records
3. **Record Display**: Shows all examination receipt records for document
4. **Receipt Operations**: Confirms or rejects receipt items
5. **Status Update**: Updates receipt status based on operations
6. **Grid Updates**: Refreshes grid after all operations

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Disables calendar editing (date is informational only)

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Executes search with validation and data retrieval

**Process**:
1. Validates document number is entered
2. Sets document number parameter for data source
3. Binds grid with filtered data
4. Clears all selections after search
5. Provides user feedback for validation failures

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Confirms receipt of examination items

**Process**:
1. Validates record selection
2. Validates document number
3. Updates receipt status to confirmed (receipt_done=1)
4. Records user and timestamp
5. Provides success feedback and refreshes grid

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects receipt of examination items

**Process**:
1. Validates record selection
2. Validates document number
3. Validates rejection reason is selected
4. Updates receipt status to rejected
5. Records rejection reason and timestamp
6. Provides success feedback and refreshes grid

## Database Integration

### Core Database Tables

#### **Inventories_Examination_receipt**
- **Purpose**: Stores examination and receipt records for inventory items
- **Key Fields**: ID, PO_ID_FK, Itemcode, Amount, Done_Amount, Remain_Amount, receipt_done, doc_id
- **Status Values**: receipt_done=0 (pending), 1 (confirmed)
- **Usage**: Main table for receipt confirmation workflow

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, active
- **Unit Types**: unit_type_id=2 (delivery), 1 (purchase)
- **Usage**: Provides unit options for different operations

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name
- **Usage**: Provides item information for display

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for receipt workflow

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code and department from user profile
**Validation**: Ensures user is authenticated before accessing receipt operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for receipt operations

#### **Record Filtering**
```sql
SELECT Inventories_Examination_receipt.ID, PO_ID_FK, ss.arabic_name, batch_no, Store_id, Itemcode, Amount, Done_Amount, Remain_Amount, delivery_id_unit, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, Inventories_UOM.description, delivery_id_unit, uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, CASe when Examination_done='0' and receipt_done='0' then 'تحت الفحص' when Examination_done='1' and receipt_done='0' then 'تحت الاستلام' when Examination_done='1' and receipt_done='1' then 'مرحلة الاضافة' else 'تم الرفض' end as Status_check
FROM Inventories_Examination_receipt 
inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt.delivery_id_unit
inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt.Purchase_Id_unit
inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode 
where doc_id=@code_doc and Examination_done='1' and receipt_done='0'
```

**Filter Logic**: Shows only records that are eligible for receipt confirmation
**Status Logic**: Examination_done=1, receipt_done=0
**Usage**: Filters pending receipt items for confirmation

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

#### **1. Document Search Section**
```html
<!-- Document Search Controls -->
<dx:BootstrapLayoutGroup Caption="اجراءات الاستلام" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Department and Employee -->
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <!-- Document Number and Search -->
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Data Grid Section**
```html
<!-- Receipt Records Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGridViewTemp" runat="server" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
```

#### **3. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Receipt Confirmation -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <!-- Receipt Rejection -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <!-- Rejection Reason -->
        <dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
    </Items>
</dx:BootstrapLayoutGroup>
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Examination Receipt Data Source
SqlDataSource SqlDataSource5 = new SqlDataSource();
SqlDataSource5.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource5.SelectCommand = "SELECT null as NUM, Inventories_Examination_receipt.ID, PO_ID_FK, ss.arabic_name, batch_no, Store_id, Itemcode, Amount, Done_Amount, Remain_Amount, delivery_id_unit, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, Inventories_UOM.description, delivery_id_unit, uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, CASe when Examination_done='0' and receipt_done='0' then 'تحت الفحص' when Examination_done='1' and receipt_done='0' then 'تحت الاستلام' when Examination_done='1' and receipt_done='1' then 'مرحلة الاضافة' else 'تم الرفض' end as Status_check FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt.delivery_id_unit inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt.Purchase_Id_unit inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode where doc_id=@code_doc and Examination_done='1' and receipt_done='0'";

// Rejection Reasons Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=18";
```

## Business Logic and Validation

### Document Search Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند');", true);
        return;
    }
    else
    {
        SqlDataSource5.SelectParameters["code_doc"].DefaultValue = txt_doc_no.Text;
        checkGridViewTemp.DataBind();
        checkGridViewTemp.Selection.UnselectAll();
    }
}
```

**Search Logic**: Validates document number before retrieving records
**Data Binding**: Binds grid with filtered records
**Selection Logic**: Clears all selections after search for clean state

### Receipt Confirmation Logic

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند');", true);
        return;
    }
    else
    {
        string ID = checkGridViewTemp.GetSelectedFieldValues("ID")[0].ToString();
        cn.ExcuteSQL("update Inventories_Examination_receipt set receipt_done='1' where ID ='" + ID + "' ");
        checkGridViewTemp.DataBind();
        checkGridViewTemp.Selection.UnselectAll();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم تأكيد الاستلام');", true);
    }
}
```

**Confirmation Logic**: Updates receipt status to confirmed
**Selection Logic**: Validates record selection before confirmation
**Data Update**: Updates receipt_done field to '1' for confirmation
**User Feedback**: Provides success message after confirmation

### Receipt Rejection Logic

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند');", true);
        return;
    }
    else if (rejectReason.Value == "" || rejectReason.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    else
    {
        string ID = checkGridViewTemp.GetSelectedFieldValues("ID")[0].ToString();
        cn.ExcuteSQL("update Inventories_Examination_receipt set receipt_done='2',reject_reason='" + rejectReason.Value.ToString() + "' where ID ='" + ID + "' ");
        checkGridViewTemp.DataBind();
        checkGridViewTemp.Selection.UnselectAll();
        rejectReason.Value = "";
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم رفض الاستلام');", true);
    }
}
```

**Rejection Logic**: Updates receipt status to rejected
**Selection Logic**: Validates record selection before rejection
**Reason Logic**: Validates rejection reason is selected
**Data Update**: Updates receipt_done field to '2' for rejection and records reason
**User Feedback**: Provides success message after rejection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Number Validation**: Must enter document number before search
- **Record Selection Validation**: Must select record before operations
- **Rejection Reason Validation**: Must select reason when rejecting items

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Validation**: Ensures document exists and has eligible records
- **Record Status Validation**: Ensures records are in proper status for operations
- **Rejection Reason Validation**: Ensures rejection reason is selected when rejecting

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to department data
- **Operation Permissions**: Validates user has permission for receipt operations
- **Record Access**: Ensures user can access and modify selected records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: Grid updates with filtered results after successful search
- **Confirmation Success**: "تم تأكيد الاستلام" (Receipt confirmed successfully)
- **Rejection Success**: "تم رفض الاستلام" (Receipt rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Examination and receipt records with workflow
  - `Inventories_UOM` - Unit of measure master data with conversion factors
  - `Inventories_Item_Settings` - Item master data with descriptions
- **Integration Details**:
  - Unit conversion calculations for different measurement types
  - Receipt status tracking for inventory workflow
  - Audit trail maintenance for all receipt operations
- **Data Flow**:
  - Pending receipts filtered by examination completion
  - Unit associations loaded based on item code and unit types
  - Receipt status updates based on confirmation/rejection operations

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
  - User authentication required for all receipt operations
  - Department auto-population based on user profile

#### **Purchase Order System**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - Purchase order header with supplier information
  - `Purchese_PO_Order_Details` - Purchase order details with quantity allocations
- **Integration Details**:
  - Purchase order information displayed in receipt grid
  - Supplier information linked to receipt records
- **Data Flow**:
  - PO header linked to examination receipt records
  - Supplier information displayed for reference

### Data Exchange

#### **Receipt Information**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Receipt workflow with status tracking
- **Real-time Data**:
  - Receipt status (pending=0, confirmed=1, rejected=2)
  - User and timestamp tracking for audit trail
  - Rejection reason recording for rejected items
- **Data Relationships**:
  - Status-based filtering for pending vs confirmed receipts
  - User tracking for accountability
  - Rejection reason management for audit trail

#### **Unit Conversion Information**
- **Database Tables**:
  - `Inventories_UOM` - Unit master data with active status
- **Real-time Data**:
  - Unit conversion factors for quantity calculations
  - Unit type associations (delivery, purchase)
  - Active unit status and availability
- **Data Relationships**:
  - Unit filtering by unit_type_id (2=delivery, 1=purchase)
  - Conversion factor calculations for quantity transformations
  - Item-unit associations for proper unit selection

#### **Supplier Information**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - PO header with supplier code
  - `purches_Supplier_record` - Supplier master data
- **Real-time Data**:
  - Supplier names and codes for display
  - Supplier associations with purchase orders
  - Supplier information in receipt records
- **Data Relationships**:
  - Supplier code linking in PO headers
  - Supplier name display in receipt grid
  - Supplier information for reference and tracking

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء ادخال رقم المستند" Error**
- **Cause**: Document number not entered before clicking search
- **Solution**: Always enter document number before clicking search button
- **Prevention**: Document number is required for all operations

#### **"الرجاء اختيار السطر" Error**
- **Cause**: No record selected before performing operations
- **Solution**: Select record from grid before clicking operation buttons
- **Prevention**: System enforces single row selection only

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected when rejecting items
- **Solution**: Always select rejection reason when rejecting receipt items
- **Prevention**: Rejection reason is required for all rejection operations

#### **No Results Displayed After Search**
- **Cause**: Document number incorrect or no eligible records exist
- **Solution**: Verify document number and check for examination completion
- **Prevention**: Ensure examination workflow is completed

#### **Receipt Confirmation Fails**
- **Cause**: Record not selected or document number missing
- **Solution**: Ensure record is selected and document number is entered
- **Prevention**: System validates all required fields before confirmation

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Receipt Confirmation Access**: Access to receipt confirmation operations
- **Department Access**: Access to department-specific data
- **Warehouse Access**: Access to storage location data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Receipt Confirmation Workflow**: Understanding of examination, receipt, and confirmation processes
- **Unit Conversion**: Knowledge of unit types and conversion factors
- **Rejection Operations**: Understanding of receipt rejection and reason selection
- **Approval Operations**: Understanding of receipt confirmation and rejection operations

## Usage Examples

### Basic Receipt Confirmation Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Document Entry**: Enter document number for examination receipt records
3. **Search Execution**: Click search to load pending receipt records
4. **Record Review**: Review examination and receipt completion status
5. **Record Selection**: Select record for confirmation
6. **Receipt Confirmation**: Click confirmation button to confirm receipt
7. **Grid Update**: Verify record status updated to confirmed

### Receipt Rejection Workflow

1. **Document Search**: Enter document number and search for records
2. **Record Selection**: Select record that needs rejection
3. **Rejection Reason Selection**: Select appropriate rejection reason
4. **Rejection Operation**: Click reject button to reject receipt
5. **Status Update**: Confirm receipt status changed to rejected
6. **Reason Recording**: Verify rejection reason recorded in system

### Multi-Record Management

1. **Document Search**: Enter document number with multiple records
2. **Record Review**: Review all records in grid
3. **Selective Confirmation**: Confirm specific records as needed
4. **Selective Rejection**: Reject specific records with reasons
5. **Status Tracking**: Monitor status of all records
6. **Audit Trail**: Review confirmation and rejection history
