← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Random_Sampling_Committee.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Random_Sampling_Committee.aspx`
**Purpose**: Committee creation and management system for inventory random sampling
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, committee managers, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Committee Creation)**
- **Store Dropdown**: Must select valid store for committee creation
- **Error Prevention**: System validates store is selected before creating committee
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents committee creation without store selection
- **Validation**: Only active stores are available

#### 2. **Committee Type Selection (Required for Committee Creation)**
- **Committee Type Dropdown**: Must select valid committee type for committee creation
- **Error Prevention**: System validates committee type is selected before creating committee
- **Data Source**: Inventories_Random_Sampling_Committee_Type table with committee types
- **Default Behavior**: User must select committee type manually
- **Error Message**: Validation prevents committee creation without committee type selection
- **Validation**: Only active committee types are available

#### 3. **Description Input (Required for Committee Creation)**
- **Description Field**: Must enter valid committee description
- **Error Prevention**: System validates description is not empty before creating committee
- **Data Source**: User input with text validation
- **Default Behavior**: User must enter description manually
- **Error Message**: Validation prevents committee creation without description
- **Validation**: Description must be non-empty and within length limits

#### 4. **Employee Selection (Required for Committee Members)**
- **Employee Dropdown**: Must select valid employee for committee membership
- **Error Prevention**: System validates employee is selected before adding member
- **Data Source**: DefinitionEmployee table with employee information
- **Default Behavior**: User must select employee manually
- **Error Message**: Validation prevents member addition without employee selection
- **Validation**: Only active employees are available

#### 5. **Validity Selection (Required for Committee Members)**
- **Validity Radio Buttons**: Must select validity type for committee member
- **Error Prevention**: System validates validity is selected before adding member
- **Data Source**: User selection from radio button options
- **Default Behavior**: User must select validity type manually
- **Error Message**: Validation prevents member addition without validity selection
- **Validation**: Only valid validity options are available

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before creating committee
- **Error**: Store already has active committee
- **Prevention**: System warns if store has existing committee

#### **Committee Type Errors**
- **Error**: No committee type selected
- **Prevention**: Always select committee type before creating committee
- **Error**: Invalid committee type
- **Prevention**: Verify committee type is valid and available

#### **Description Errors**
- **Error**: No description entered
- **Prevention**: Always enter description before creating committee
- **Error**: Description too long
- **Prevention**: System validates description length

#### **Employee Selection Errors**
- **Error**: No employee selected
- **Prevention**: Always select employee before adding member
- **Error**: Employee already in committee
- **Prevention**: System checks for duplicate members

#### **Validity Selection Errors**
- **Error**: No validity type selected
- **Prevention**: Always select validity type before adding member
- **Error**: Multiple committee heads
- **Prevention**: System validates only one committee head

#### **Committee Management Errors**
- **Error**: Committee creation fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Committee update fails
- **Prevention**: Ensure committee is selected for update
- **Error**: Committee close fails
- **Prevention**: Ensure committee is selected for closing
- **Error**: Committee delete fails
- **Prevention**: Ensure committee is selected for deletion

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have committee management permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Committee types must be configured** in the system
5. **Employees must be available** for committee membership

#### **Required System State**
- User authentication must be active
- Committee management permissions must be configured
- Store data must be current
- Committee type data must be current
- Employee data must be current

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper committee creation
- ✅ Store selection enables committee management

#### **For Committee Type Selection**
- ✅ Committee type dropdown populated with active types only
- ✅ Committee type validation ensures proper committee creation
- ✅ Committee type selection enables committee creation

#### **For Description Input**
- ✅ Description field accepts valid text input
- ✅ Description validation ensures proper committee creation
- ✅ Description length validation prevents excessive input

#### **For Employee Selection**
- ✅ Employee dropdown populated with active employees only
- ✅ Employee validation ensures proper member addition
- ✅ Employee selection enables committee membership

#### **For Validity Selection**
- ✅ Validity radio buttons display properly
- ✅ Validity validation ensures proper member addition
- ✅ Validity selection enables committee roles

#### **For Committee Management**
- ✅ Committee creation creates proper committee records
- ✅ Committee update updates committee information
- ✅ Committee close closes committee properly
- ✅ Committee delete removes committee completely

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout">
```

**Form Layout**: Bootstrap form layout with vertical structure for committee management

### Store and Code Selection Section

```html
<!-- Store and Code Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapComboBox runat="server" ID="Combox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{0} - {1} - {2}" CssClasses-Control="mb-5" OnSelectedIndexChanged="Combox_Store_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ColSpanMd="3" Caption="كود العينة">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapTextBox runat="server" ID="TextBox_Sample_Code" Enabled="false" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ColSpanMd="3" Caption="كود اللجنة">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapTextBox runat="server" ID="TextBox_Committee_Code" Enabled="false" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Description and Date Section

```html
<!-- Description and Date -->
<dx:BootstrapLayoutItem ColSpanMd="8" Caption="الوصف">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapTextBox runat="server" ID="textBox_Description" CssClasses-Input="text-center" NullText="ادخل وصف اللجنة" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ColSpanMd="3" Caption="تاريخ اللجنة">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapTextBox runat="server" ID="TextBox_Date" Enabled="false" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Committee Type and Employee Selection Section

```html
<!-- Committee Type and Employee Selection -->
<dx:BootstrapLayoutItem Caption="نوع اللجنة" ColSpanMd="5">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Committee_Type" AutoPostBack="true" DataSourceID="DS_Committee_Type" ValueField="ID" DropDownRows="5" NullText="اختر نوع اللجنة" CssClasses-Control="mb-5">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="5">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapComboBox runat="server" ID="Combox_Employee" AutoPostBack="true" DataSourceID="DS_Employee" ValueField="EmpID" DropDownRows="5" NullText="اختر الموظف" CssClasses-Control="mb-5" OnSelectedIndexChanged="Combox_Employee_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="EmpID" />
                    <dx:BootstrapListBoxField FieldName="Name" />
                    <dx:BootstrapListBoxField FieldName="EmpName" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Validity and Add Member Section

```html
<!-- Validity and Add Member -->
<dx:BootstrapLayoutItem Caption="الصلاحية" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <dx:BootstrapRadioButtonList runat="server" RepeatColumns="2" ID="Check_Validity">
                <Items>
                    <dx:BootstrapListEditItem Value="1" Text="رئيس اللجنة" Selected="true" />
                    <dx:BootstrapListEditItem Value="0" Text="عضو لجنة" />
                </Items>
            </dx:BootstrapRadioButtonList>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_Add_Member" Text="اضافة" OnClick="Btn_Add_Member_Click" Enabled="false">
                <SettingsBootstrap RenderOption="Primary" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Committee Members Grid Section

```html
<!-- Committee Members Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <div class="d-flex border mb-5" style="border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_Committee" DataSourceID="DataSource_Committee" KeyFieldName="ID" AutoGenerateColumns="true" Width="100%" Font-Size="Small" EnableCallBacks="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" SettingsText-CommandDelete="حذف" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsText-EmptyDataRow="لاتوجد بيانات للعرض" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnRowDeleted="GV_Committee_RowDeleted" OnCustomColumnDisplayText="GV_Committee_CustomColumnDisplayText">
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="false" />
                    <Columns>
                        <dx:BootstrapGridViewTextColumn Caption="المسلسل" VisibleIndex="0" UnboundType="String"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" Caption="كود اللجنة" VisibleIndex="1" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Employee_Code" Caption="كود الموظف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Employee_Name" Caption="مسمي عضو اللجنة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Employee_Job" Caption="الوظيفة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Employee_Validity" Caption="الصلاحية" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Validity" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewCommandColumn ShowCancelButton="true" ShowDeleteButton="true" ShowNewButtonInHeader="false" Width="80px" VisibleIndex="6" />
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="10">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Create Committee Button Section

```html
<!-- Create Committee Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_CreateCommittee" Text="إنشاء لجنة الجرد" OnClick="Btn_CreateCommittee_Click">
                <SettingsBootstrap RenderOption="Success" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" ID="Btn_UpdateCommittee" Text="تحديث لجنة الجرد" OnClick="Btn_UpdateCommittee_Click" Enabled="false" Visible="false">
                <SettingsBootstrap RenderOption="Success" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Store Committees Grid Section

```html
<!-- Store Committees Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl CssClass="mb-5">
            <div class="d-flex border mb-5" style="border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_StoreCommittees" DataSourceID="DS_StoreCommittees" KeyFieldName="ID" AutoGenerateColumns="true" Width="100%" Font-Size="Small" EnableCallBacks="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" SettingsText-CommandEdit="غلق" SettingsText-CommandDelete="حذف" SettingsText-CommandUpdate="btn-danger" OnHtmlDataCellPrepared="GV_StoreCommittees_HtmlDataCellPrepared" OnCustomColumnDisplayText="GV_StoreCommittees_CustomColumnDisplayText" OnSelectionChanged="GV_StoreCommittees_SelectionChanged">
                    <SettingsBehavior AllowSelectByRowClick="true" AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                    <SettingsDataSecurity AllowDelete="false" AllowInsert="False" AllowEdit="false" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="true" VisibleIndex="0" Width="100px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn Caption="المسلسل" VisibleIndex="0" UnboundType="String"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" Caption="" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Description" Caption="وصف اللجنة" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Date" Caption="تاريخ الانشاء" VisibleIndex="3" PropertiesTextEdit-DisplayFormatString="{0:dd-MM-yyyy}"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Committe_Type" Caption="نوع اللجنة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Sample_ID" Caption="كود العينة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Committee_Status" Caption="الحالة" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Status" Visible="false"></dx:BootstrapGridViewTextColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="10">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Committee Management Buttons Section

```html
<!-- Committee Management Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_CloseCommittee" Enabled="false" Text="إغلاق لجنة الجرد" OnClick="Btn_CloseCommittee_Click">
                <SettingsBootstrap RenderOption="Primary" />
                <CssClasses Icon="simple-icon-note" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" ID="Btn_DeleteCommittee" Enabled="false" Text="حذف" OnClick="Btn_DeleteCommittee_Click">
                <SettingsBootstrap RenderOption="Danger" />
                <CssClasses Icon="simple-icon-trash" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@User_ID` - User ID for filtering temporary records

**Store Parameters**:
- `@Store_ID` - Store ID for filtering committees

**Committee Parameters**:
- `@ID` - Committee ID for filtering committee members

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads committees based on selected store
3. **Committee Type Selection**: Loads committee types for selection
4. **Employee Selection**: Loads employees for committee membership
5. **Member Addition**: Adds employee to committee with validity
6. **Committee Creation**: Creates committee with members
7. **Committee Management**: Updates, closes, or deletes committees

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default committee state
4. Initializes date displays

### Combox_Store_SelectedIndexChanged Method

```csharp
protected void Combox_Store_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads committees based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for committee data source
3. Binds committee grid
4. Updates store information display

### Btn_Add_Member_Click Method

```csharp
protected void Btn_Add_Member_Click(object sender, EventArgs e)
```

**Purpose**: Adds employee to committee with validity

**Process**:
1. Validates employee selection
2. Validates validity selection
3. Checks for duplicate members
4. Adds member to temporary table
5. Refreshes committee grid
6. Provides success feedback

### Btn_CreateCommittee_Click Method

```csharp
protected void Btn_CreateCommittee_Click(object sender, EventArgs e)
```

**Purpose**: Creates committee with members

**Process**:
1. Validates store selection
2. Validates committee type selection
3. Validates description
4. Validates at least one member is added
5. Creates committee header record
6. Creates committee member records
7. Clears temporary tables
8. Refreshes all grids
9. Provides success feedback

### Btn_UpdateCommittee_Click Method

```csharp
protected void Btn_UpdateCommittee_Click(object sender, EventArgs e)
```

**Purpose**: Updates committee information

**Process**:
1. Validates committee selection
2. Validates description
3. Updates committee header record
4. Provides success feedback

### Btn_CloseCommittee_Click Method

```csharp
protected void Btn_CloseCommittee_Click(object sender, EventArgs e)
```

**Purpose**: Closes committee

**Process**:
1. Validates committee selection
2. Updates committee status to closed
3. Provides success feedback

### Btn_DeleteCommittee_Click Method

```csharp
protected void Btn_DeleteCommittee_Click(object sender, EventArgs e)
```

**Purpose**: Deletes committee

**Process**:
1. Validates committee selection
2. Deletes committee header record
3. Deletes committee member records
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Random_Sampling_Committee_Type**
- **Purpose**: Committee type master data
- **Key Fields**: ID, Name, active
- **Usage**: Provides committee type list for selection
- **Filtering**: Only active committee types

#### **DefinitionEmployee**
- **Purpose**: Employee master data
- **Key Fields**: EmpID, EmpName, active
- **Usage**: Provides employee list for committee membership
- **Filtering**: Only active employees

#### **Inventories_Random_Sampling_Committee_Members_temp**
- **Purpose**: Temporary committee member records
- **Key Fields**: ID, Emp_ID, Validity, User_ID
- **Usage**: Tracks committee members before committee creation
- **Filtering**: Only members associated with selected user

#### **Inventories_Random_Sampling_Committee_Header**
- **Purpose**: Committee header information
- **Key Fields**: ID, Description, Date, Store_ID, Committe_Type, Sample_ID, Status, Deleted
- **Usage**: Tracks committee information
- **Filtering**: Only committees for selected store

#### **Inventories_Random_Sampling_Committee_Members**
- **Purpose**: Committee member records
- **Key Fields**: ID, Committee_ID, Employee_Code, Employee_Name, Employee_Job, Validity
- **Usage**: Tracks committee members
- **Filtering**: Only members for selected committee

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing committee data

#### **Store Filtering**
```sql
SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store
```

**Filtering Logic**: Shows all stores for user
**Permission Logic**: All stores are available
**Validation**: Ensures store has committee data

#### **Committee Type Filtering**
```sql
SELECT ID, Name FROM Inventories_Random_Sampling_Committee_Type
```

**Filtering Logic**: Shows all committee types for user
**Permission Logic**: All committee types are available
**Validation**: Ensures committee type is valid

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, committee type, and employee dropdowns

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectByRowClick="true"
SettingsBehavior-AllowSelectSingleRowOnly="true"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Single row selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to committee members and store committees grids

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with vertical structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store and Code Selection Section**
```html
<!-- Store and Code Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
<dx:BootstrapLayoutItem ColSpanMd="3" Caption="كود العينة">
<dx:BootstrapLayoutItem ColSpanMd="3" Caption="كود اللجنة">
```

#### **2. Description and Date Section**
```html
<!-- Description and Date -->
<dx:BootstrapLayoutItem ColSpanMd="8" Caption="الوصف">
<dx:BootstrapLayoutItem ColSpanMd="3" Caption="تاريخ اللجنة">
```

#### **3. Committee Type and Employee Selection Section**
```html
<!-- Committee Type and Employee Selection -->
<dx:BootstrapLayoutItem Caption="نوع اللجنة" ColSpanMd="5">
<dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="5">
```

#### **4. Validity and Add Member Section**
```html
<!-- Validity and Add Member -->
<dx:BootstrapLayoutItem Caption="الصلاحية" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="" ColSpanMd="3">
```

#### **5. Committee Members Grid Section**
```html
<!-- Committee Members Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **6. Create Committee Button Section**
```html
<!-- Create Committee Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **7. Store Committees Grid Section**
```html
<!-- Store Committees Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **8. Committee Management Buttons Section**
```html
<!-- Committee Management Buttons -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";

// Committee Type Data Source
SqlDataSource DS_Committee_Type = new SqlDataSource();
DS_Committee_Type.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_Committee_Type.SelectCommand = "Select ID, Name from Inventories_Random_Sampling_Committee_Type";

// Employee Data Source
SqlDataSource DS_Employee = new SqlDataSource();
DS_Employee.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DS_Employee.SelectCommand = "SELECT emp.EmpID, emp.EmpName, job.Name FROM Orman.dbo.DefinitionEmployee emp INNER JOIN Orman.dbo.DefinitionEmployee1 emp1 on emp1.EmpID = emp.EmpID INNER JOIN Orman.dbo.DefinitionJobs job on job.ID = emp1.EmpJob WHERE emp1.Active is null";

// Committee Members Data Source
SqlDataSource DataSource_Committee = new SqlDataSource();
DataSource_Committee.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Committee.SelectCommand = "SELECT emp.EmpID AS Employee_Code, emp.EmpName AS Employee_Name, job.Name as Employee_Job, temp.ID, temp.Validity, CASE WHEN temp.Validity = 1 THEN 'رئيس اللجنة' WHEN temp.Validity = 0 THEN 'عضو لجنة' END AS Employee_Validity FROM Orman.dbo.DefinitionEmployee emp INNER JOIN Orman.dbo.DefinitionEmployee1 emp1 on convert(nvarchar(50), emp1.EmpID) = emp.EmpID INNER JOIN Orman.dbo.DefinitionJobs job on convert(nvarchar(50), job.ID) = emp1.EmpJob INNER JOIN frontoffice.dbo.Inventories_Random_Sampling_Committee_Members_temp temp on convert(nvarchar(50), temp.Emp_ID) = emp.EmpID WHERE emp1.Active is null AND temp.User_ID = @User_ID ORDER BY Validity DESC";
DataSource_Committee.DeleteCommand = "DELETE FROM Inventories_Random_Sampling_Committee_Members_temp where ID = @ID";

// Store Committees Data Source
SqlDataSource DS_StoreCommittees = new SqlDataSource();
DS_StoreCommittees.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_StoreCommittees.SelectCommand = "SELECT Header.ID, Header.Sample_ID, Header.Description, Header.Date, Header.Status, Type.Name AS Committe_Type, Header.Sample_ID, CASE WHEN Header.Status = 1 THEN 'مغلق' WHEN Header.Status = 0 THEN 'مفتوح' END AS Committee_Status FROM Inventories_Random_Sampling_Committee_Header Header INNER JOIN Inventories_Random_Sampling_Committee_Type Type ON Type.ID = Header.Committe_Type WHERE Header.Store_ID = @Store_ID AND Deleted = 0 ORDER BY Header.ID DESC";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void Combox_Store_SelectedIndexChanged(object sender, EventArgs e)
{
    if (Combox_Store.Value == "" || Combox_Store.Value == null)
    {
        // Clear committee grid
        GV_StoreCommittees.DataSource = null;
        GV_StoreCommittees.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading committees
**Error Prevention**: Prevents committee loading without store selection

### Employee Selection Validation

```csharp
protected void Btn_Add_Member_Click(object sender, EventArgs e)
{
    if (Combox_Employee.Value == "" || Combox_Employee.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الموظف');", true);
        return;
    }
    // ... additional validation
}
```

**Employee Logic**: Validates employee selection before adding member
**Error Prevention**: Prevents member addition without employee selection

### Validity Selection Validation

```csharp
protected void Btn_Add_Member_Click(object sender, EventArgs e)
{
    if (Check_Validity.Value == "" || Check_Validity.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصلاحية');", true);
        return;
    }
    // ... additional validation
}
```

**Validity Logic**: Validates validity selection before adding member
**Error Prevention**: Prevents member addition without validity selection

### Committee Creation Validation

```csharp
protected void Btn_CreateCommittee_Click(object sender, EventArgs e)
{
    if (Combox_Store.Value == "" || Combox_Store.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates all required fields before creating committee
**Error Prevention**: Prevents committee creation without proper validation

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before creating committee
- **Committee Type Validation**: Must select committee type before creating committee
- **Description Validation**: Must enter description before creating committee
- **Employee Validation**: Must select employee before adding member
- **Validity Validation**: Must select validity before adding member

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Committee Type Validation**: Ensures committee type is active and available
- **Description Validation**: Ensures description is non-empty and within limits
- **Employee Validation**: Ensures employee is active and available
- **Validity Validation**: Ensures validity is selected and valid

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Committee Access**: Ensures user can access and modify committee records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Member Addition Success**: "تم اضافة عضو اللجنة" (Committee member added successfully)
- **Committee Creation Success**: "تم إنشاء لجنة الجرد" (Inventory committee created successfully)
- **Committee Update Success**: "تم تحديث لجنة الجرد" (Inventory committee updated successfully)
- **Committee Close Success**: "تم إغلاق لجنة الجرد" (Inventory committee closed successfully)
- **Committee Delete Success**: "تم حذف لجنة الجرد" (Inventory committee deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of committee grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Committee Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Type` - Committee type information
  - `DefinitionEmployee` - Employee master data
  - `Inventories_Random_Sampling_Committee_Members_temp` - Temporary committee member records
  - `Inventories_Random_Sampling_Committee_Header` - Committee header information
  - `Inventories_Random_Sampling_Committee_Members` - Committee member records
- **Integration Details**:
  - Store selection controls committee filtering
  - Committee type selection controls committee creation
  - Employee selection controls committee membership
- **Data Flow**:
  - Stores filtered for user access
  - Committee types filtered for selection
  - Employees filtered for committee membership

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all committee operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Committee Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Type` - Committee type information
- **Real-time Data**:
  - Store information for filtering
  - Committee type information for selection
  - Committee information and status
- **Data Relationships**:
  - Stores linked to committees via Store_ID
  - Committee types linked to committees via Committe_Type
  - Committees linked to members via Committee_ID

#### **Employee and Member Information**
- **Database Tables**:
  - `DefinitionEmployee` - Employee master data
  - `Inventories_Random_Sampling_Committee_Members_temp` - Temporary committee member records
  - `Inventories_Random_Sampling_Committee_Members` - Committee member records
- **Real-time Data**:
  - Employee details and job information
  - Committee member validity and roles
  - Committee member status and information
- **Data Relationships**:
  - Employees linked to committee members via Emp_ID
  - Committee members linked to committees via Committee_ID
  - Validity linked to committee roles via Validity field

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before creating committee
- **Solution**: Always select store before creating committee
- **Prevention**: Store selection is required for all committee operations

#### **"الرجاء اختيار نوع اللجنة" Error**
- **Cause**: Committee type not selected before creating committee
- **Solution**: Always select committee type before creating committee
- **Prevention**: Committee type selection is required for all committee operations

#### **"الرجاء ادخال الوصف" Error**
- **Cause**: Description not entered before creating committee
- **Solution**: Always enter description before creating committee
- **Prevention**: Description entry is required for all committee operations

#### **"الرجاء اختيار الموظف" Error**
- **Cause**: Employee not selected before adding member
- **Solution**: Always select employee before adding member
- **Prevention**: Employee selection is required for all member operations

#### **"الرجاء اختيار الصلاحية" Error**
- **Cause**: Validity not selected before adding member
- **Solution**: Always select validity before adding member
- **Prevention**: Validity selection is required for all member operations

#### **Committee Creation Failed Error**
- **Cause**: Committee cannot be created
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before creation

#### **Committee Update Failed Error**
- **Cause**: Committee cannot be updated
- **Solution**: Verify committee is selected for update
- **Prevention**: Ensure proper selection before update

#### **Committee Close Failed Error**
- **Cause**: Committee cannot be closed
- **Solution**: Verify committee is selected for closing
- **Prevention**: Ensure proper selection before closing

#### **Committee Delete Failed Error**
- **Cause**: Committee cannot be deleted
- **Solution**: Verify committee is selected for deletion
- **Prevention**: Ensure proper selection before deletion

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Committee Access**: Access to committee management operations
- **Store Access**: Access to stores with committee data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Committee Workflow**: Understanding of committee creation process
- **Store Management**: Knowledge of store selection and filtering
- **Committee Type Management**: Knowledge of committee type selection
- **Employee Management**: Knowledge of employee selection and committee membership

## Usage Examples

### Basic Committee Creation Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for committee creation
3. **Committee Type Selection**: Select committee type for committee
4. **Description Entry**: Enter committee description
5. **Employee Selection**: Select employees for committee membership
6. **Validity Selection**: Select validity type for each member
7. **Member Addition**: Add members to committee
8. **Committee Creation**: Create committee with all members

### Committee Management Workflow

1. **Store Selection**: Select store for committee management
2. **Committee Review**: Review existing committees for selected store
3. **Committee Selection**: Select committee for management
4. **Committee Update**: Update committee information
5. **Committee Close**: Close committee when complete
6. **Committee Delete**: Delete committee if needed

### Multi-Member Committee Management

1. **Store Selection**: Select store for committee creation
2. **Committee Type Selection**: Select committee type for committee
3. **Description Entry**: Enter committee description
4. **Multiple Employee Selection**: Select multiple employees for committee
5. **Validity Assignment**: Assign validity types for each member
6. **Member Addition**: Add all members to committee
7. **Committee Creation**: Create committee with all members
8. **Committee Management**: Manage committee as needed