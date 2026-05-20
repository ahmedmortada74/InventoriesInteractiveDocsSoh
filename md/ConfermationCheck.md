← Go back to 
[Inventories Module Documentation](/Inventories)

# ConfermationCheck.aspx

## Overview

**File**: `\Inventories\Process\ConfermationCheck.aspx`
**Purpose**: Committee confirmation and speculation approval system for inventory items with multi-level approval workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Committee members, inventory supervisors, speculation approval personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document and Committee Selection (Required for Approval)**
- **Document Dropdown**: Must select valid document with committee for speculation approval
- **Error Prevention**: System validates document is selected before loading speculation records
- **Data Source**: Inventories_Speculation_HD table filtered by first approval status
- **Default Behavior**: User must select document manually from available pending documents
- **Error Message**: Validation prevents loading records without document selection
- **Validation**: Only documents with status='first' are available

#### 2. **Committee Member Assignment (Required for Approval)**
- **Member Textboxes**: Display committee head and up to 5 members for approval workflow
- **Error Prevention**: System displays pre-assigned committee members based on document configuration
- **Data Source**: Committee configuration from document header
- **Default Behavior**: Committee members are displayed based on document assignment
- **Error Message**: N/A - display-only fields
- **Validation**: Committee members are pre-configured per document

#### 3. **Approval Decision (Required for Committee Members)**
- **Approval Buttons**: Committee members must approve or reject speculation items
- **Error Prevention**: System validates approval decision is made for each committee member
- **Data Source**: User interaction with approval buttons
- **Default Behavior**: Committee members click approval buttons to make decisions
- **Error Message**: Validation prevents incomplete approval workflow
- **Validation**: Each committee member must make approval decision

#### 4. **Rejection Reason Selection (Conditional for Rejection)**
- **Reason Dropdown**: Required when rejecting speculation items
- **Error Prevention**: System validates rejection reason is selected when rejecting items
- **Data Source**: Inventories_Reasons table filtered by speculation rejection type
- **Default Behavior**: Reason dropdown enabled only when rejection is selected
- **Error Message**: Validation prevents rejection without reason selection
- **Validation**: Only active reasons (active=1, type=10) are available

### Common Error Scenarios and Prevention

#### **Document and Committee Errors**
- **Error**: No document selected
- **Prevention**: Always select document before loading speculation records
- **Error**: Document not found
- **Prevention**: Verify document number is correct and has pending approval status
- **Error**: Committee not assigned to document
- **Prevention**: Ensure document has proper committee configuration

#### **Speculation Record Errors**
- **Error**: No speculation records found
- **Prevention**: Ensure document has items pending speculation approval
- **Error**: Speculation already approved
- **Prevention**: Verify document has status='first' for approval workflow
- **Error**: Committee member not assigned
- **Prevention**: Ensure document has proper committee member configuration

#### **Approval and Rejection Errors**
- **Error**: Approval fails
- **Prevention**: Ensure committee member has proper permissions for approval
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected when rejecting items
- **Error**: Committee member access denied
- **Prevention**: Verify user is assigned to selected committee

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has speculation approval permissions
- **Error**: Committee member access denied
- **Prevention**: Verify user is assigned to selected committee
- **Error**: Document access restricted
- **Prevention**: Ensure user has access to document's committee

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have speculation approval permissions** via employee group assignments
3. **Document must be pending speculation approval** with proper status
4. **Committee must be configured** with proper member assignments
5. **Speculation workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Speculation approval permissions must be configured
- Document speculation workflow must be enabled
- Committee member assignments must be current
- Speculation rejection reasons must be configured

### Success Criteria

#### **For Document Selection**
- ✅ Document dropdown populated with pending speculation documents only
- ✅ Committee members displayed based on document configuration
- ✅ Document validation prevents loading without selection
- ✅ Committee validation ensures proper document-committee association

#### **For Speculation Records**
- ✅ Speculation grid displays all items pending approval
- ✅ Item details show complete speculation information
- ✅ Committee member status displays approval/rejection state
- ✅ Speculation workflow status updates properly

#### **For Committee Approval**
- ✅ Committee head can approve/reject speculation items
- ✅ Committee members can approve/reject based on their assignment level
- ✅ Approval status updates in real-time
- ✅ Rejection requires proper reason selection

#### **For Speculation Workflow**
- ✅ Speculation status progresses through committee review
- ✅ All committee members must complete review before final approval
- ✅ Rejection by any member stops speculation workflow
- ✅ Approval by all members completes speculation process

#### **For Data Management**
- ✅ Speculation records refresh after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on approval status

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for speculation approval

### Document Selection Section

```html
<!-- Document Selection -->
<dx:BootstrapLayoutItem Caption=" رقم المستند واسم اللجنة" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbFileId" TextField="check_Name" ValueField="id" DataSourceID="dsInventory" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="cbFileId_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="check_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Speculation Records Grid Section

```html
<!-- Speculation Records Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdDetails" AutoPostBack="true" runat="server" AutoGenerateColumns="False" KeyFieldName="fileID" EnableCallBacks="false" DataSourceID="dsItemsDetails" CssClasses-Control="margin" OnCustomColumnDisplayText="grdDetails_CustomColumnDisplayText" OnHtmlDataCellPrepared="grdDetails_HtmlDataCellPrepared">
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewTextColumn VisibleIndex="1" Caption="مسلسل"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inventory_Name" VisibleIndex="2" Caption="اسم المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inventory_code" VisibleIndex="3" Caption="كود المخزن"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Kind" VisibleIndex="4" Caption="نوع الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Kind_code" VisibleIndex="5" Caption="كود نوع الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Name" VisibleIndex="6" Caption="اسم الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_Name_code" VisibleIndex="7" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_No" VisibleIndex="8" Caption="الدفعة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="available_amount" VisibleIndex="9" Caption="الكمية المتاحة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Unit" VisibleIndex="10" Caption="وحدة صرف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="price_Unit" VisibleIndex="11" Caption="سعر الوحدة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="total_Price" VisibleIndex="12" Caption="اجمالى القيمة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exp_Date" VisibleIndex="13" Caption="تاريخ الصلاحية"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="speculation_Amount" VisibleIndex="14" Caption="كمية التكهين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="speculation_Reason" VisibleIndex="15" Caption="سبب التكهين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="StockId" VisibleIndex="16" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="head_approve" Caption="رئيس اللجنة" Visible="true" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="emp1_approve" Caption="مسؤل 1" Visible="true" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="emp2_approve" Caption="مسؤل 2" Visible="true" VisibleIndex="19"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="emp3_approve" Caption="مسؤل 3" Visible="true" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="emp4_approve" Caption="مسؤل 4" Visible="true" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="emp5_approve" Caption="مسؤل 5" Visible="true" VisibleIndex="22"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" Items="10, 20, 50" />
                </SettingsPager>
                <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                <SettingsDataSecurity AllowEdit="False" AllowInsert="False" AllowDelete="False"></SettingsDataSecurity>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Committee Member Sections

```html
<!-- Committee Head Section -->
<dx:BootstrapLayoutGroup Caption="رئيس اللجنة" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="emp_head_temp" runat="server" Enabled="false" TextFormatString="{0} - {1}"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="acceptbtn" runat="server" ClientInstanceName="btn" Width="100%" Text=" تأكيد التكهين " Enabled="false" OnClick="acceptbtn_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn1" Width="100%" Text=" رفض التكهين " Enabled="false" OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                        <CssClasses Icon="simple-icon-refresh" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbReasons" Enabled="false" DropDownStyle="DropDown" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="reason" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>

<!-- Committee Member 1 Section -->
<dx:BootstrapLayoutGroup Caption="مسؤل رقم1" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="emp_head_temp1" runat="server" Enabled="false" TextFormatString="{0} - {1}"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="emp1_acceptbtn" runat="server" ClientInstanceName="btn2" Enabled="false" Width="100%" Text=" تأكيد التكهين " OnClick="emp1_acceptbtn_Click">
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
                    <dx:BootstrapButton ID="emp1_rejectbtn" runat="server" ClientInstanceName="btn3" Enabled="false" Width="100%" Text=" رفض التكهين " OnClick="emp1_rejectbtn_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                        <CssClasses Icon="simple-icon-refresh" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbReasons1" Enabled="false" DropDownStyle="DropDown" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15">
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

### Additional Committee Members

The page includes similar sections for committee members 2, 3, 4, and 5, each with:
- Employee display textbox
- Approval button
- Rejection button
- Rejection reason dropdown

## Data Flow Architecture

### Query String Parameters

The system uses document parameters for comprehensive data filtering:

**Document Parameters**:
- `@FILE_ID` - Document ID for filtering speculation records

**User Context Parameters**:
- Committee members are pre-assigned based on document configuration

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Selection**: Loads speculation records for selected document
3. **Speculation Display**: Shows all items pending speculation approval
4. **Committee Review**: Committee members approve/reject speculation items
5. **Status Update**: Updates speculation status based on committee decisions
6. **Workflow Completion**: Completes speculation when all members approve

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default speculation approval workflow state

### cbFileId_SelectedIndexChanged Method

```csharp
protected void cbFileId_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads speculation records based on selected document

**Process**:
1. Retrieves selected document ID
2. Sets parameters for speculation data source
3. Binds speculation grid with filtered records
4. Clears all selections after binding

### acceptbtn_Click Method (Committee Head)

```csharp
protected void acceptbtn_Click(object sender, EventArgs e)
```

**Purpose**: Committee head approval of speculation items

**Process**:
1. Validates speculation record selection
2. Updates head approval status (FirstAp_head_emp_ind='1')
3. Records approval timestamp and user
4. Refreshes speculation grid
5. Provides success feedback

### reject_Click Method (Committee Head)

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Committee head rejection of speculation items

**Process**:
1. Validates speculation record selection
2. Validates rejection reason is selected
3. Updates head rejection status (FirstAp_head_emp_ind='2')
4. Records rejection reason and timestamp
5. Refreshes speculation grid
6. Provides success feedback

### emp1_acceptbtn_Click Method (Member 1)

```csharp
protected void emp1_acceptbtn_Click(object sender, EventArgs e)
```

**Purpose**: Committee member 1 approval of speculation items

**Process**:
1. Validates speculation record selection
2. Updates member 1 approval status (FirstAp_emp1_ind='1')
3. Records approval timestamp and user
4. Refreshes speculation grid
5. Provides success feedback

### emp1_rejectbtn_Click Method (Member 1)

```csharp
protected void emp1_rejectbtn_Click(object sender, EventArgs e)
```

**Purpose**: Committee member 1 rejection of speculation items

**Process**:
1. Validates speculation record selection
2. Validates rejection reason is selected
3. Updates member 1 rejection status (FirstAp_emp1_ind='2')
4. Records rejection reason and timestamp
5. Refreshes speculation grid
6. Provides success feedback

Similar methods exist for committee members 2, 3, 4, and 5.

## Database Integration

### Core Database Tables

#### **Inventories_Speculation_HD**
- **Purpose**: Speculation header with committee approval tracking
- **Key Fields**: id, check_Name, status
- **Status Values**: status='first' (pending approval)
- **Usage**: Main table for speculation workflow tracking

#### **Inventories_speculation_DTL**
- **Purpose**: Speculation detail items with committee approval tracking
- **Key Fields**: FKFile_HD, inventory_Name, inventory_code, item_Kind, item_Kind_code, item_Name, item_Name_code, batch_No, available_amount, storage_Unit, price_Unit, total_Price, exp_Date, speculation_Amount, speculation_Reason, StockId, FirstAp_head_emp_ind, FirstAp_emp1_ind, FirstAp_emp2_ind, FirstAp_emp3_ind, FirstAp_emp4_ind, FirstAp_emp5_ind
- **Status Values**: FirstAp_head_emp_ind/FirstAp_emp1-5_ind: '0' (pending), '1' (approved), '2' (rejected)
- **Usage**: Main table for speculation approval workflow

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for speculation workflow

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing speculation operations

#### **Committee Member Display**
```csharp
emp_head_temp.Text = "Committee Head Name";
emp_head_temp1.Text = "Member 1 Name";
emp_head_temp2.Text = "Member 2 Name";
emp_head_temp3.Text = "Member 3 Name";
emp_head_temp4.Text = "Member 4 Name";
emp_head_temp5.Text = "Member 5 Name";
```

**Display Logic**: Shows committee members based on document configuration
**Validation**: Committee members are pre-assigned per document
**Usage**: Provides context for speculation approval workflow

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

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Document Selection Section**
```html
<!-- Document Selection -->
<dx:BootstrapLayoutItem Caption=" رقم المستند واسم اللجنة" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="cbFileId" runat="server" OnSelectedIndexChanged="cbFileId_SelectedIndexChanged">
```

#### **2. Speculation Records Grid Section**
```html
<!-- Speculation Records Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdDetails" runat="server" OnCustomColumnDisplayText="grdDetails_CustomColumnDisplayText" OnHtmlDataCellPrepared="grdDetails_HtmlDataCellPrepared">
```

#### **3. Committee Member Sections**
```html
<!-- Committee Head Section -->
<dx:BootstrapLayoutGroup Caption="رئيس اللجنة" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
<!-- Committee Member 1 Section -->
<dx:BootstrapLayoutGroup Caption="مسؤل رقم1" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
<!-- Committee Member 2 Section -->
<dx:BootstrapLayoutGroup Caption="مسؤل رقم2" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
<!-- Committee Member 3 Section -->
<dx:BootstrapLayoutGroup Caption="مسؤل رقم 3" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
<!-- Committee Member 4 Section -->
<dx:BootstrapLayoutGroup Caption="مسؤل رقم 4" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
<!-- Committee Member 5 Section -->
<dx:BootstrapLayoutGroup Caption="مسؤل رقم 5" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Document Data Source
SqlDataSource dsInventory = new SqlDataSource();
dsInventory.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsInventory.SelectCommand = "select id,check_Name from Inventories_Speculation_HD where status='first'";

// Speculation Records Data Source
SqlDataSource dsItemsDetails = new SqlDataSource();
dsItemsDetails.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsItemsDetails.SelectCommand = "select FKFile_HD,inventory_Name,inventory_code,item_Kind,item_Kind_code,item_Name,item_Name_code,batch_No,available_amount,storage_Unit,price_Unit,total_Price,exp_Date,speculation_Amount,speculation_Reason,StockId, case when FirstAp_head_emp_ind='0' then 'انتظار رئيس اللجنة' when FirstAp_head_emp_ind='1' then 'موافق' when FirstAp_head_emp_ind='2' then 'تم الرفض' end as head_approve, case when FirstAp_emp1_ind='0' then 'انتظار مسؤل 1' when FirstAp_emp1_ind='1' then 'موافق' when FirstAp_emp1_ind='2' then 'تم الرفض' end as emp1_approve, case when FirstAp_emp2_ind='0' then 'انتظار مسؤل 2' when FirstAp_emp2_ind='1' then 'موافق' when FirstAp_emp2_ind='2' then 'تم الرفض' end as emp2_approve, case when FirstAp_emp3_ind='0' then 'انتظار مسؤل 3' when FirstAp_emp3_ind='1' then 'موافق' when FirstAp_emp3_ind='2' then 'تم الرفض' else '' end as emp3_approve, case when FirstAp_emp4_ind='0' then 'انتظار مسؤل 4' when FirstAp_emp4_ind='1' then 'موافق' when FirstAp_emp4_ind='2' then 'تم الرفض' else '' end as emp4_approve, case when FirstAp_emp5_ind='0' then 'انتظار مسؤل 5' when FirstAp_emp5_ind='1' then 'موافق' when FirstAp_emp5_ind='2' then 'تم الرفض' else '' end as emp5_approve from Inventories_speculation_DTL dt inner join Inventories_Speculation_HD hd on hd.id=dt.FKFile_HD where FKFile_HD=@FILE_ID and hd.status='first'";

// Rejection Reasons Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=10";
```

## Business Logic and Validation

### Document Selection Validation

```csharp
protected void cbFileId_SelectedIndexChanged(object sender, EventArgs e)
{
    if (cbFileId.Value == "" || cbFileId.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المستند');", true);
        return;
    }
    else
    {
        dsItemsDetails.SelectParameters["FILE_ID"].DefaultValue = cbFileId.Value.ToString();
        grdDetails.DataBind();
    }
}
```

**Document Logic**: Validates document selection before loading speculation records
**Data Binding**: Binds speculation grid with filtered records
**Selection Logic**: Clears all selections after binding for clean state

### Committee Approval Logic

```csharp
protected void acceptbtn_Click(object sender, EventArgs e)
{
    if (grdDetails.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else
    {
        string StockId = grdDetails.GetSelectedFieldValues("StockId")[0].ToString();
        cn.ExcuteSQL("update Inventories_speculation_DTL set FirstAp_head_emp_ind='1' where StockId ='" + StockId + "' ");
        grdDetails.DataBind();
        grdDetails.Selection.UnselectAll();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم تأكيد التكهين');", true);
    }
}
```

**Approval Logic**: Updates committee head approval status
**Selection Logic**: Validates speculation record selection before approval
**Data Update**: Updates FirstAp_head_emp_ind field to '1' for approval
**User Feedback**: Provides success message after approval

### Committee Rejection Logic

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (grdDetails.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else if (cbReasons.Value == "" || cbReasons.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    else
    {
        string StockId = grdDetails.GetSelectedFieldValues("StockId")[0].ToString();
        cn.ExcuteSQL("update Inventories_speculation_DTL set FirstAp_head_emp_ind='2',FirstAp_head_reason='" + cbReasons.Value.ToString() + "' where StockId ='" + StockId + "' ");
        grdDetails.DataBind();
        grdDetails.Selection.UnselectAll();
        cbReasons.Value = "";
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم رفض التكهين');", true);
    }
}
```

**Rejection Logic**: Updates committee head rejection status
**Selection Logic**: Validates speculation record selection before rejection
**Reason Logic**: Validates rejection reason is selected
**Data Update**: Updates FirstAp_head_emp_ind field to '2' for rejection and records reason
**User Feedback**: Provides success message after rejection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Selection Validation**: Must select document before loading records
- **Speculation Record Selection Validation**: Must select record before approval/rejection
- **Rejection Reason Validation**: Must select reason when rejecting items

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Status Validation**: Ensures document has pending speculation status
- **Committee Assignment Validation**: Ensures document has proper committee assignment
- **Speculation Status Validation**: Ensures items are pending speculation review
- **Committee Member Validation**: Ensures committee members are properly assigned

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Committee Access**: Ensures user has access to committee operations
- **Document Access**: Ensures user can access and modify selected documents

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Approval Success**: "تم تأكيد التكهين" (Speculation confirmed successfully)
- **Rejection Success**: "تم رفض التكهين" (Speculation rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of speculation grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on approval status
- **Status Updates**: Speculation status updates in real-time

## Integration Points

### External Systems

#### **Speculation Management System**
- **Database Tables**:
  - `Inventories_Speculation_HD` - Speculation header with committee tracking
  - `Inventories_speculation_DTL` - Speculation detail items with approval tracking
  - `Inventories_Reasons` - Rejection reason configuration
- **Integration Details**:
  - Speculation workflow controlled by committee assignments
  - Committee approval tracked at individual member level
  - Speculation status progresses through committee review
  - Rejection stops speculation workflow
- **Data Flow**:
  - Documents filtered by speculation status
  - Speculation records filtered by document-committee combination
  - Committee approval tracked per member
  - Rejection reasons filtered by speculation type

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all speculation operations
  - Committee access controlled by document configuration

### Data Exchange

#### **Document and Committee Information**
- **Database Tables**:
  - `Inventories_Speculation_HD` - Speculation header
  - `Inventories_speculation_DTL` - Speculation details
- **Real-time Data**:
  - Document speculation status
  - Committee assignment
  - Committee member approval status
- **Data Relationships**:
  - Documents linked to committees via header configuration
  - Committee approval tracked per member
  - Speculation status progresses through workflow

#### **Speculation Records Information**
- **Database Tables**:
  - `Inventories_speculation_DTL` - Speculation records with status tracking
- **Real-time Data**:
  - Speculation item details
  - Committee member approval status
  - Speculation workflow status
- **Data Relationships**:
  - Speculation records linked to items and inventory
  - Committee approval tracked per member
  - Status calculated based on speculation workflow

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المستند" Error**
- **Cause**: Document not selected before loading speculation records
- **Solution**: Always select document before loading speculation records
- **Prevention**: Document selection is required for all speculation operations

#### **"الرجاء اختيار السطر" Error**
- **Cause**: No speculation record selected before approval/rejection
- **Solution**: Always select speculation record before clicking approval/rejection buttons
- **Prevention**: Speculation record selection is required for all committee operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected when rejecting items
- **Solution**: Always select rejection reason when rejecting speculation items
- **Prevention**: Rejection reason is required for all rejection operations

#### **No Speculation Records Found**
- **Cause**: Document has no items pending speculation approval
- **Solution**: Verify document has items with status='first'
- **Prevention**: Ensure document has proper speculation workflow status

#### **Committee Member Buttons Disabled**
- **Cause**: Committee member not properly assigned or authorized
- **Solution**: Verify user is assigned to selected committee
- **Prevention**: Ensure committee has proper member configuration

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Speculation Approval Access**: Access to speculation approval operations
- **Document Access**: Access to documents with speculation workflow
- **Committee Member Access**: Access to committee member operations

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Speculation Workflow**: Understanding of speculation approval process
- **Committee Operations**: Knowledge of committee member approval/rejection
- **Document Management**: Familiarity with document speculation workflow
- **Status Tracking**: Understanding of speculation status progression

## Usage Examples

### Basic Speculation Approval Workflow

1. **Page Load**: Verify page loads with default settings
2. **Document Selection**: Select document with pending speculation approval
3. **Record Review**: Review speculation items in grid
4. **Committee Approval**: Committee head approves speculation items
5. **Member Review**: Committee members review and approve/reject items
6. **Workflow Completion**: Complete speculation when all members approve

### Committee Approval Workflow

1. **Speculation Record Selection**: Select speculation record for review
2. **Committee Head Approval**: Committee head clicks approval button
3. **Status Update**: Head approval status updates to 'موافق'
4. **Member Review**: Committee members review speculation items
5. **Member Approval**: Members click approval buttons for their level
6. **Status Progression**: Approval status progresses through committee levels
7. **Final Approval**: Complete speculation when all members approve

### Committee Rejection Workflow

1. **Speculation Record Selection**: Select speculation record for rejection
2. **Rejection Reason Selection**: Select appropriate rejection reason
3. **Committee Head Rejection**: Committee head clicks rejection button
4. **Status Update**: Head rejection status updates to 'تم الرفض'
5. **Workflow Stop**: Speculation workflow stops due to rejection
6. **Reason Recording**: Rejection reason recorded for audit trail
7. **Status Update**: Speculation status updates to rejected state

### Multi-Member Committee Review

1. **Committee Configuration**: Committee configured with head and 5 members
2. **Document Assignment**: Document assigned to committee for review
3. **Head Review**: Committee head reviews and approves/rejects
4. **Member 1 Review**: First member reviews and approves/rejects
5. **Member 2 Review**: Second member reviews and approves/rejects
6. **Member 3 Review**: Third member reviews and approves/rejects
7. **Member 4 Review**: Fourth member reviews and approves/rejects
8. **Member 5 Review**: Fifth member reviews and approves/rejects
9. **Final Decision**: Complete speculation based on all member decisions
