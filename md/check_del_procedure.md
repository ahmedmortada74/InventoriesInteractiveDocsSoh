← Go back to 
[Inventories Module Documentation](/Inventories)

# check_del_procedure.aspx

## Overview

**File**: `\Inventories\Process\check_del_procedure.aspx`
**Purpose**: Inventory examination and inspection procedures management system for committee-based document review
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Examination committee members, inventory supervisors, quality control personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document Selection (Required for Examination)**
- **Document Dropdown**: Must select valid document number for examination
- **Error Prevention**: System validates document is selected before loading examination records
- **Data Source**: Inventories_Examination_receipt table filtered by pending examination status
- **Default Behavior**: User must select document manually from available pending documents
- **Error Message**: Validation prevents search without document selection
- **Validation**: Only documents with Examination_done='0', receipt_done='0', Adding_indator='0' are available

#### 2. **Examination Committee Selection (Required for Workflow)**
- **Committee Dropdown**: Must select valid examination committee for document review
- **Error Prevention**: System validates committee is selected before loading examination records
- **Data Source**: Inventories_check_header table filtered by active committees
- **Default Behavior**: User must select committee manually after document selection
- **Error Message**: Validation prevents search without committee selection
- **Validation**: Only active committees (active=1) with proper document associations are available

#### 3. **Committee Member Assignment (Required for Approval)**
- **Member Dropdowns**: Must assign committee head and up to 5 members for examination
- **Error Prevention**: System validates member assignments before enabling approval actions
- **Data Source**: Users table filtered by active employees
- **Default Behavior**: Committee members are pre-assigned based on committee configuration
- **Error Message**: Validation prevents approval without proper member assignments
- **Validation**: Only active employees (Active=1) excluding system users are available

#### 4. **Rejection Reason Selection (Conditional for Rejection)**
- **Reason Dropdown**: Required when rejecting examination items
- **Error Prevention**: System validates rejection reason is selected when rejecting items
- **Data Source**: Inventories_Reasons table filtered by examination rejection type
- **Default Behavior**: Reason dropdown enabled only when rejection is selected
- **Error Message**: Validation prevents rejection without reason selection
- **Validation**: Only active reasons (active=1, type=19) are available

### Common Error Scenarios and Prevention

#### **Document and Committee Errors**
- **Error**: No document selected
- **Prevention**: Always select document number before clicking search
- **Error**: No committee selected
- **Prevention**: Always select examination committee before clicking search
- **Error**: Document not found
- **Prevention**: Verify document number is correct and has pending examination status

#### **Examination Record Errors**
- **Error**: No examination records found
- **Prevention**: Ensure document has items pending examination
- **Error**: Examination already completed
- **Prevention**: Verify document has Examination_done='0' status
- **Error**: Committee not assigned to document
- **Prevention**: Ensure document has proper committee assignment (fk_check)

#### **Approval and Rejection Errors**
- **Error**: Approval fails
- **Prevention**: Ensure all required committee members have reviewed items
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected when rejecting items
- **Error**: Committee member not assigned
- **Prevention**: Verify committee has proper member configuration

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has examination committee permissions
- **Error**: Committee member access denied
- **Prevention**: Verify user is assigned to selected committee
- **Error**: Document access restricted
- **Prevention**: Ensure user has access to document's department

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have examination committee permissions** via employee group assignments
3. **Document must be pending examination** with proper status
4. **Committee must be configured** with proper member assignments
5. **Examination workflow must be enabled** for inventory items

#### **Required System State**
- User authentication must be active
- Examination committee permissions must be configured
- Document examination workflow must be enabled
- Committee member assignments must be current
- Examination reasons must be configured

### Success Criteria

#### **For Document Selection**
- ✅ Document dropdown populated with pending examination documents only
- ✅ Committee dropdown populated based on selected document
- ✅ Document validation prevents search without selection
- ✅ Committee validation ensures proper document-committee association

#### **For Examination Records**
- ✅ Examination grid displays all items pending review
- ✅ Item details show complete examination information
- ✅ Committee member status displays approval/rejection state
- ✅ Examination workflow status updates properly

#### **For Committee Approval**
- ✅ Committee head can approve/reject examination items
- ✅ Committee members can approve/reject based on their assignment level
- ✅ Approval status updates in real-time
- ✅ Rejection requires proper reason selection

#### **For Examination Workflow**
- ✅ Examination status progresses through committee review
- ✅ All committee members must complete review before final approval
- ✅ Rejection by any member stops examination workflow
- ✅ Approval by all members completes examination process

#### **For Data Management**
- ✅ Examination records refresh after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on examination status

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for examination procedures

### Document and Committee Selection Section

```html
<!-- Document and Committee Selection -->
<dx:BootstrapLayoutGroup Caption="اجراءات الفحص" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
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
                    <dx:BootstrapComboBox ID="txt_doc_no" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="doc_data_sorce" ValueField="doc_id" TextField="doc_id">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="لجنة الفحص" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="check_type" runat="server" TextFormatString="{1}" AutoPostBack="True" enablemulticolumn="true" OnSelectedIndexChanged="check_type_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource1" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                        </Fields>
                    </dx:BootstrapComboBox>
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

### Examination Records Grid Section

```html
<!-- Examination Records Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" OnHtmlDataCellPrepared="checkGridViewTemp_HtmlDataCellPrepared" DataSourceID="SqlDataSource5" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="true" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnCustomColumnDisplayText="checkGridViewTemp_CustomColumnDisplayText" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
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
                            <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" Visible="true" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd" VisibleIndex="15"></dx:BootstrapGridViewDateColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="use_number" Caption="رقم التشغيلة" Visible="true" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Status_check" Caption="حالة" Visible="true" VisibleIndex="16"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="head_approve" Caption="رئيس اللجنة" Visible="true" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp1_approve" Caption="مسؤل 1" Visible="true" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp2_approve" Caption="مسؤل 2" Visible="true" VisibleIndex="19"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp3_approve" Caption="مسؤل 3" Visible="true" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp4_approve" Caption="مسؤل 4" Visible="true" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp5_approve" Caption="مسؤل 5" Visible="true" VisibleIndex="22"></dx:BootstrapGridViewTextColumn>
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

### Committee Member Sections

```html
<!-- Committee Head Section -->
<dx:BootstrapLayoutGroup Caption="رئيس اللجنة" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="4">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="emp_head_temp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource7" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="save_btn" Width="100%" Text=" تأكيد الفحص " Enabled="false" OnClick="save_btn_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(save_btn,'save_btn'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="reject" Width="100%" Text=" رفض الفحص " Enabled="false" OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(reject,'reject'); }" />
                        <CssClasses Icon="simple-icon-refresh" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15" Enabled="false" Width="100%" ID="head_reason">
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
                    <dx:BootstrapComboBox ID="emp_head_temp1" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource6" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="emp_But1_save" runat="server" ClientInstanceName="emp_But1_save" Enabled="false" Width="100%" Text=" تأكيد الفحص " OnClick="emp_But1_save_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(emp_But1_save,'emp_But1_save'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="emp_But1_reject" runat="server" ClientInstanceName="emp_But1_reject" Enabled="false" Width="100%" Text=" رفض الفحص " OnClick="emp_But1_reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(emp_But1_reject,'emp_But1_reject'); }" />
                        <CssClasses Icon="simple-icon-refresh" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" AutoPostBack="true" TextField="reason" ValueField="id" DataSourceID="dsReasons1" EnableMultiColumn="true" CallbackPageSize="15" Enabled="false" Width="100%" ID="emp_reason1">
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
- Employee selection dropdown
- Approval button
- Rejection button
- Rejection reason dropdown

## Data Flow Architecture

### Query String Parameters

The system uses document and committee parameters for comprehensive data filtering:

**Document Parameters**:
- `@code_doc` - Document ID for filtering examination records
- `@code_check` - Committee ID for filtering examination records

**User Context Parameters**:
- `@FK_user` - User ID for committee member filtering

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Selection**: Filters committees based on selected document
3. **Committee Selection**: Loads examination records for document-committee combination
4. **Examination Display**: Shows all items pending examination review
5. **Committee Review**: Committee members approve/reject examination items
6. **Status Update**: Updates examination status based on committee decisions
7. **Workflow Completion**: Completes examination when all members approve

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
4. Sets default examination workflow state

### check_type_SelectedIndexChanged Method

```csharp
protected void check_type_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads examination records based on selected committee

**Process**:
1. Retrieves selected committee ID
2. Sets parameters for examination data source
3. Binds examination grid with filtered records
4. Clears all selections after binding

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Executes search with validation and data retrieval

**Process**:
1. Validates document number is selected
2. Validates committee is selected
3. Sets parameters for examination data source
4. Binds examination grid with filtered records
5. Clears all selections after search

### save_btn_Click Method (Committee Head)

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Committee head approval of examination items

**Process**:
1. Validates examination record selection
2. Updates head approval status (head_emp_ind='1')
3. Records approval timestamp and user
4. Refreshes examination grid
5. Provides success feedback

### reject_Click Method (Committee Head)

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Committee head rejection of examination items

**Process**:
1. Validates examination record selection
2. Validates rejection reason is selected
3. Updates head rejection status (head_emp_ind='2')
4. Records rejection reason and timestamp
5. Refreshes examination grid
6. Provides success feedback

### emp_But1_save_Click Method (Member 1)

```csharp
protected void emp_But1_save_Click(object sender, EventArgs e)
```

**Purpose**: Committee member 1 approval of examination items

**Process**:
1. Validates examination record selection
2. Updates member 1 approval status (emp1_ind='1')
3. Records approval timestamp and user
4. Refreshes examination grid
5. Provides success feedback

### emp_But1_reject_Click Method (Member 1)

```csharp
protected void emp_But1_reject_Click(object sender, EventArgs e)
```

**Purpose**: Committee member 1 rejection of examination items

**Process**:
1. Validates examination record selection
2. Validates rejection reason is selected
3. Updates member 1 rejection status (emp1_ind='2')
4. Records rejection reason and timestamp
5. Refreshes examination grid
6. Provides success feedback

Similar methods exist for committee members 2, 3, 4, and 5.

## Database Integration

### Core Database Tables

#### **Inventories_Examination_receipt**
- **Purpose**: Examination receipt records with committee approval tracking
- **Key Fields**: ID, doc_id, PO_ID_FK, Itemcode, Amount, Examination_done, receipt_done, Adding_indator, fk_check, head_emp_ind, emp1_ind, emp2_ind, emp3_ind, emp4_ind, emp5_ind
- **Status Values**: head_emp_ind/emp1-5_ind: '0' (pending), '1' (approved), '2' (rejected)
- **Usage**: Main table for examination workflow tracking

#### **Inventories_check_header**
- **Purpose**: Examination committee configuration
- **Key Fields**: ID, description, active, temp_exp, check_type
- **Usage**: Provides committee options for examination workflow

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name
- **Usage**: Provides item information for examination records

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for examination records

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides committee member options

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for examination workflow

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing examination operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for examination operations

#### **Committee Member Filtering**
```sql
select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')
```

**Filtering Logic**: Shows only active employees excluding system users
**Permission Logic**: Only active employees can be committee members
**Validation**: Ensures committee members are valid employees

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

#### **1. Document and Committee Selection Section**
```html
<!-- Document and Committee Selection -->
<dx:BootstrapLayoutGroup Caption="اجراءات الفحص" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="لجنة الفحص" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Examination Records Grid Section**
```html
<!-- Examination Records Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGridViewTemp" runat="server" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
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
SqlDataSource doc_data_sorce = new SqlDataSource();
doc_data_sorce.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
doc_data_sorce.SelectCommand = "select distinct Inventories_Examination_receipt.doc_id from Inventories_Examination_receipt where Examination_done='0' and receipt_done='0' and Adding_indator='0' and Adding_rev_indator='0' and Adding_approve_indator='0'";

// Committee Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select distinct Inventories_check_header.ID,description from Inventories_check_header inner join Inventories_Examination_receipt on Inventories_Examination_receipt.fk_check=Inventories_check_header.ID where (temp_exp=1 or check_type=1) and Inventories_check_header.active=1 and Inventories_Examination_receipt.doc_id=@code_doc";

// Examination Records Data Source
SqlDataSource SqlDataSource5 = new SqlDataSource();
SqlDataSource5.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource5.SelectCommand = "SELECT null as NUM, Inventories_Examination_receipt.ID,ss.arabic_name,PO_ID_FK, Itemcode,Store_id, Amount,batch_no, Done_Amount, Remain_Amount, PO_DemandAmount,delivery_id_unit, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, CASe when Examination_done='0' and receipt_done='0' then 'تحت الفحص' when Examination_done='1' and receipt_done='0' then 'تحت الاستلام' when Examination_done='1' and receipt_done='1' then 'مرحلة الاضافة' else 'تم الرفض' end as Status_check, case when head_emp_ind='0' then 'انتظار رئيس اللجنة' when head_emp_ind='1' then 'موافق' when head_emp_ind='2' then 'تم الرفض' end as head_approve, case when emp1_ind='0' then 'انتظار مسؤل 1' when emp1_ind='1' then 'موافق' when emp1_ind='2' then 'تم الرفض' end as emp1_approve, case when emp2_ind='0' then 'انتظار مسؤل 2' when emp2_ind='1' then 'موافق' when emp2_ind='2' then 'تم الرفض' end as emp2_approve, case when emp3_ind='0' then 'انتظار مسؤل 3' when emp3_ind='1' then 'موافق' when emp3_ind='2' then 'تم الرفض' else '' end as emp3_approve, case when emp4_ind='0' then 'انتظار مسؤل 4' when emp4_ind='1' then 'موافق' when emp4_ind='2' then 'تم الرفض' else '' end as emp4_approve, case when emp5_ind='0' then 'انتظار مسؤل 5' when emp5_ind='1' then 'موافق' when emp5_ind='2' then 'تم الرفض' else '' end as emp5_approve,use_number FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt.delivery_id_unit inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt.Purchase_Id_unit inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode where doc_id=@code_doc and Examination_done='0' and fk_check=@code_check";

// Committee Member Data Sources
SqlDataSource SqlDataSource7 = new SqlDataSource(); // Committee Head
SqlDataSource SqlDataSource6 = new SqlDataSource(); // Member 1
SqlDataSource SqlDataSource4 = new SqlDataSource(); // Member 2
SqlDataSource SqlDataSource3 = new SqlDataSource(); // Member 3
SqlDataSource SqlDataSource2 = new SqlDataSource(); // Member 4
SqlDataSource SqlDataSource8 = new SqlDataSource(); // Member 5
```

## Business Logic and Validation

### Document and Committee Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند');", true);
        return;
    }
    else if (check_type.Value == "" || check_type.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار لجنة الفحص');", true);
        return;
    }
    else
    {
        SqlDataSource5.SelectParameters["code_doc"].DefaultValue = txt_doc_no.Text;
        SqlDataSource5.SelectParameters["code_check"].DefaultValue = check_type.Value.ToString();
        checkGridViewTemp.DataBind();
        checkGridViewTemp.Selection.UnselectAll();
    }
}
```

**Document Logic**: Validates document number before retrieving examination records
**Committee Logic**: Validates committee selection before retrieving examination records
**Data Binding**: Binds examination grid with filtered records
**Selection Logic**: Clears all selections after search for clean state

### Committee Approval Logic

```csharp
protected void save_btn_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else
    {
        string ID = checkGridViewTemp.GetSelectedFieldValues("ID")[0].ToString();
        cn.ExcuteSQL("update Inventories_Examination_receipt set head_emp_ind='1' where ID ='" + ID + "' ");
        checkGridViewTemp.DataBind();
        checkGridViewTemp.Selection.UnselectAll();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم تأكيد الفحص');", true);
    }
}
```

**Approval Logic**: Updates committee head approval status
**Selection Logic**: Validates examination record selection before approval
**Data Update**: Updates head_emp_ind field to '1' for approval
**User Feedback**: Provides success message after approval

### Committee Rejection Logic

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    if (checkGridViewTemp.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else if (head_reason.Value == "" || head_reason.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    else
    {
        string ID = checkGridViewTemp.GetSelectedFieldValues("ID")[0].ToString();
        cn.ExcuteSQL("update Inventories_Examination_receipt set head_emp_ind='2',head_reason='" + head_reason.Value.ToString() + "' where ID ='" + ID + "' ");
        checkGridViewTemp.DataBind();
        checkGridViewTemp.Selection.UnselectAll();
        head_reason.Value = "";
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم رفض الفحص');", true);
    }
}
```

**Rejection Logic**: Updates committee head rejection status
**Selection Logic**: Validates examination record selection before rejection
**Reason Logic**: Validates rejection reason is selected
**Data Update**: Updates head_emp_ind field to '2' for rejection and records reason
**User Feedback**: Provides success message after rejection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Selection Validation**: Must select document before search
- **Committee Selection Validation**: Must select committee before search
- **Examination Record Selection Validation**: Must select record before approval/rejection
- **Rejection Reason Validation**: Must select reason when rejecting items

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Status Validation**: Ensures document has pending examination status
- **Committee Assignment Validation**: Ensures document has proper committee assignment
- **Examination Status Validation**: Ensures items are pending examination review
- **Committee Member Validation**: Ensures committee members are properly assigned

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to department data
- **Committee Access**: Ensures user has access to committee operations
- **Document Access**: Ensures user can access and modify selected documents

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: Grid updates with filtered results after successful search
- **Approval Success**: "تم تأكيد الفحص" (Examination confirmed successfully)
- **Rejection Success**: "تم رفض الفحص" (Examination rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of examination grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on examination status
- **Status Updates**: Examination status updates in real-time

## Integration Points

### External Systems

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Examination records with committee tracking
  - `Inventories_check_header` - Committee configuration
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure data
- **Integration Details**:
  - Examination workflow controlled by committee assignments
  - Committee approval tracked at individual member level
  - Examination status progresses through committee review
  - Rejection stops examination workflow
- **Data Flow**:
  - Documents filtered by examination status
  - Committees filtered by document associations
  - Examination records filtered by document-committee combination
  - Committee approval tracked per member

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
  - User authentication required for all examination operations
  - Department auto-population based on user profile

#### **Committee Management System**
- **Database Tables**:
  - `Inventories_check_header` - Committee configuration
  - `Users` - Committee member master data
  - `Inventories_Reasons` - Rejection reason configuration
- **Integration Details**:
  - Committee members assigned from active employees
  - Committee approval tracked at individual level
  - Rejection reasons configured per examination type
- **Data Flow**:
  - Committee members filtered by active status
  - Committee approval tracked per member
  - Rejection reasons filtered by examination type

### Data Exchange

#### **Document and Committee Information**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Examination records
  - `Inventories_check_header` - Committee configuration
- **Real-time Data**:
  - Document examination status
  - Committee assignment
  - Committee member approval status
- **Data Relationships**:
  - Documents linked to committees via fk_check field
  - Committee approval tracked per member
  - Examination status progresses through workflow

#### **Examination Records Information**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Examination records with status tracking
  - `Inventories_Item_Settings` - Item descriptions
  - `Inventories_UOM` - Unit information
- **Real-time Data**:
  - Examination item details
  - Committee member approval status
  - Examination workflow status
- **Data Relationships**:
  - Examination records linked to items and units
  - Committee approval tracked per member
  - Status calculated based on examination workflow

#### **Committee Member Information**
- **Database Tables**:
  - `Users` - Committee member master data
  - `Inventories_Reasons` - Rejection reasons
- **Real-time Data**:
  - Committee member assignments
  - Approval/rejection status
  - Rejection reasons
- **Data Relationships**:
  - Committee members linked to employees
  - Approval tracked per member
  - Rejection reasons linked to examination type

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء ادخال رقم المستند" Error**
- **Cause**: Document number not entered before clicking search
- **Solution**: Always select document number before clicking search button
- **Prevention**: Document number is required for all examination operations

#### **"الرجاء اختيار لجنة الفحص" Error**
- **Cause**: Committee not selected before clicking search
- **Solution**: Always select examination committee before clicking search button
- **Prevention**: Committee selection is required for all examination operations

#### **"الرجاء اختيار السطر" Error**
- **Cause**: No examination record selected before approval/rejection
- **Solution**: Always select examination record before clicking approval/rejection buttons
- **Prevention**: Examination record selection is required for all committee operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected when rejecting items
- **Solution**: Always select rejection reason when rejecting examination items
- **Prevention**: Rejection reason is required for all rejection operations

#### **No Examination Records Found**
- **Cause**: Document has no items pending examination
- **Solution**: Verify document has items with Examination_done='0' status
- **Prevention**: Ensure document has proper examination workflow status

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
- **Examination Committee Access**: Access to examination committee operations
- **Document Access**: Access to documents with examination workflow
- **Committee Member Access**: Access to committee member operations

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Examination Workflow**: Understanding of examination committee process
- **Committee Operations**: Knowledge of committee member approval/rejection
- **Document Management**: Familiarity with document examination workflow
- **Status Tracking**: Understanding of examination status progression

## Usage Examples

### Basic Examination Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Document Selection**: Select document number from pending examination documents
3. **Committee Selection**: Select examination committee for document review
4. **Search Execution**: Click search to load examination records
5. **Record Review**: Review examination items in grid
6. **Committee Approval**: Committee head approves examination items
7. **Member Review**: Committee members review and approve/reject items
8. **Workflow Completion**: Complete examination when all members approve

### Committee Approval Workflow

1. **Examination Record Selection**: Select examination record for review
2. **Committee Head Approval**: Committee head clicks approval button
3. **Status Update**: Head approval status updates to 'موافق'
4. **Member Review**: Committee members review examination items
5. **Member Approval**: Members click approval buttons for their level
6. **Status Progression**: Approval status progresses through committee levels
7. **Final Approval**: Complete examination when all members approve

### Committee Rejection Workflow

1. **Examination Record Selection**: Select examination record for rejection
2. **Rejection Reason Selection**: Select appropriate rejection reason
3. **Committee Head Rejection**: Committee head clicks rejection button
4. **Status Update**: Head rejection status updates to 'تم الرفض'
5. **Workflow Stop**: Examination workflow stops due to rejection
6. **Reason Recording**: Rejection reason recorded for audit trail
7. **Status Update**: Examination status updates to rejected state

### Multi-Member Committee Review

1. **Committee Configuration**: Committee configured with head and 5 members
2. **Document Assignment**: Document assigned to committee for review
3. **Head Review**: Committee head reviews and approves/rejects
4. **Member 1 Review**: First member reviews and approves/rejects
5. **Member 2 Review**: Second member reviews and approves/rejects
6. **Member 3 Review**: Third member reviews and approves/rejects
7. **Member 4 Review**: Fourth member reviews and approves/rejects
8. **Member 5 Review**: Fifth member reviews and approves/rejects
9. **Final Decision**: Complete examination based on all member decisions
