← Go back to 
[Inventories Module Documentation](/Inventories)


# ConfirmExchangeRequests.aspx

## Overview

**File**: `\Inventories\Process\ConfirmExchangeRequests.aspx`
**Purpose**: Exchange request confirmation and approval system for inventory items with quantity modification and rejection capabilities
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory supervisors, exchange request approvers, quantity modification personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Exchange Request Type Selection (Required for Filtering)**
- **Request Type Dropdown**: Must select valid exchange request type for filtering
- **Error Prevention**: System validates request type is selected before loading requests
- **Data Source**: Inventories_Dispense_types table filtered by active types
- **Default Behavior**: User must select request type manually
- **Error Message**: Validation prevents loading requests without type selection
- **Validation**: Only active request types (excluding types 4,8,9) are available

#### 2. **Exchange Request Number Selection (Required for Approval)**
- **Request Number Dropdown**: Must select valid exchange request number for approval
- **Error Prevention**: System validates request number is selected before loading details
- **Data Source**: Inventories_Dispense_Request_Header table filtered by date and type
- **Default Behavior**: User must select request number manually
- **Error Message**: Validation prevents loading details without request selection
- **Validation**: Only requests from current date with pending approval are available

#### 3. **Quantity Modification (Optional for Approval)**
- **Quantity Field**: Optional modification of item quantities during approval
- **Error Prevention**: System allows empty quantity for no modification
- **Data Source**: User input with validation
- **Default Behavior**: User can enter quantity manually or leave empty
- **Error Message**: N/A - optional field
- **Validation**: Quantity must be positive number if entered

#### 4. **Modification Reason Selection (Conditional for Modification)**
- **Reason Dropdown**: Required when modifying item quantities
- **Error Prevention**: System validates modification reason is selected when modifying quantities
- **Data Source**: Inventories_Reasons table filtered by modification type
- **Default Behavior**: Reason dropdown enabled only when quantity is modified
- **Error Message**: Validation prevents modification without reason selection
- **Validation**: Only active reasons (type=13) are available

#### 5. **Rejection Reason Selection (Required for Rejection)**
- **Reason Dropdown**: Required when rejecting exchange requests
- **Error Prevention**: System validates rejection reason is selected when rejecting requests
- **Data Source**: Inventories_Reasons table filtered by rejection type
- **Default Behavior**: Reason dropdown enabled only when rejection is selected
- **Error Message**: Validation prevents rejection without reason selection
- **Validation**: Only active reasons (type=13) are available

### Common Error Scenarios and Prevention

#### **Request Selection Errors**
- **Error**: No request type selected
- **Prevention**: Always select request type before loading requests
- **Error**: No request number selected
- **Prevention**: Always select request number before loading details
- **Error**: Request not found
- **Prevention**: Verify request number is correct and has pending approval

#### **Request Detail Errors**
- **Error**: No request details found
- **Prevention**: Ensure request has items pending approval
- **Error**: Request already approved
- **Prevention**: Verify request has Approval=0 status
- **Error**: Request access denied
- **Prevention**: Ensure user has access to request's employee group

#### **Modification and Rejection Errors**
- **Error**: Modification fails
- **Prevention**: Ensure modification reason is selected when modifying quantities
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected when rejecting requests
- **Error**: Quantity modification invalid
- **Prevention**: Ensure quantity is positive number when modifying

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has exchange request approval permissions
- **Error**: Request access denied
- **Prevention**: Verify user has access to request's employee group
- **Error**: Employee group access restricted
- **Prevention**: Ensure user has access to selected employee group

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have exchange request approval permissions** via employee group assignments
3. **Exchange requests must be pending approval** with proper status
4. **Employee groups must be configured** with proper member assignments
5. **Modification and rejection reasons must be configured** in the system

#### **Required System State**
- User authentication must be active
- Exchange request approval permissions must be configured
- Employee group assignments must be current
- Modification and rejection reasons must be configured
- Exchange request workflow must be enabled

### Success Criteria

#### **For Request Selection**
- ✅ Request type dropdown populated with active request types only
- ✅ Request number dropdown populated based on selected type and date
- ✅ Request type validation prevents loading without selection
- ✅ Request number validation ensures proper request selection

#### **For Request Details**
- ✅ Request details grid displays all items pending approval
- ✅ Item details show complete request information
- ✅ Unit information displays properly for each item
- ✅ Request workflow status updates properly

#### **For Request Approval**
- ✅ Request approval updates status to approved
- ✅ Quantity modification works with proper reason selection
- ✅ Approval status updates in real-time
- ✅ Success feedback confirms approval completion

#### **For Request Rejection**
- ✅ Request rejection updates status to rejected
- ✅ Rejection requires proper reason selection
- ✅ Rejection status updates in real-time
- ✅ Success feedback confirms rejection completion

#### **For Data Management**
- ✅ Request details refresh after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on approval status

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for exchange request approval

### Request Selection Section

```html
<!-- Request Selection -->
<dx:BootstrapLayoutItem Caption="نوع طلب الصرف" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbOrderKind" TextField="Description" ValueField="id" DataSourceID="DespinsDS" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="Description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbOrderNum" DropDownStyle="DropDown" TextField="OrderNo" ValueField="id" DataSourceID="OrderNumDS" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="cbOrderNum_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="OrderNo" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Details Grid Section

```html
<!-- Request Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdShowDetails" AutoPostBack="true" runat="server" AutoGenerateColumns="False" KeyFieldName="id" EnableCallBacks="false" DataSourceID="dsshowItems" OnCustomColumnDisplayText="grdShowDetails_CustomColumnDisplayText" OnSelectionChanged="grdShowDetails_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0" />
                    <dx:BootstrapGridViewTextColumn FieldName="id" VisibleIndex="1" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn VisibleIndex="1" Caption="مسلسل"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" VisibleIndex="2" Caption="نوع الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ar_name" VisibleIndex="3" Caption="اسم الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" VisibleIndex="4" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="UNIT" VisibleIndex="5" Caption="وحدة الصرف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" VisibleIndex="6" Caption="الكمية"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Due_Date" VisibleIndex="7" Caption="مدة الاحتياج"></dx:BootstrapGridViewTextColumn>
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

### Modification Section

```html
<!-- Modification Section -->
<dx:BootstrapLayoutItem Caption="تعديل الكمية" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="txtQuantity" runat="server" AutoPostBack="true"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem Caption="سبب التعديل" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbReason1" TextField="reason" ValueField="id" DataSourceID="reasonDS1" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="reason" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" Text="تعديل الكمية" ID="btnEdit" OnClick="btnEdit_Click">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Approval and Rejection Section

```html
<!-- Approval and Rejection Section -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" Text="قبول الطلب" ID="Agree" OnClick="Agree_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbReason2" TextField="reason" ValueField="id" DataSourceID="ReasonDs2" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="reason" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" Text="رفض الطلب" ID="Reject" OnClick="Reject_Click">
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses request and employee parameters for comprehensive data filtering:

**Request Parameters**:
- `@orderType` - Request type for filtering requests
- `@fk_Header` - Request ID for filtering request details

**User Context Parameters**:
- `@emp` - Employee code for filtering requests based on employee group

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Request Type Selection**: Loads requests based on selected type
3. **Request Selection**: Loads request details for selected request
4. **Request Display**: Shows all items pending approval
5. **Approval/Rejection**: Approves or rejects requests with proper validation
6. **Status Update**: Updates request status based on approval decisions

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default exchange request approval workflow state

### cbOrderNum_SelectedIndexChanged Method

```csharp
protected void cbOrderNum_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads request details based on selected request

**Process**:
1. Retrieves selected request ID
2. Sets parameters for request details data source
3. Binds request details grid with filtered records
4. Clears all selections after binding

### Agree_Click Method

```csharp
protected void Agree_Click(object sender, EventArgs e)
```

**Purpose**: Approves exchange request

**Process**:
1. Validates request selection
2. Updates request status to approved (Approval=1)
3. Records approval timestamp and user
4. Refreshes request details grid
5. Provides success feedback

### Reject_Click Method

```csharp
protected void Reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects exchange request

**Process**:
1. Validates request selection
2. Validates rejection reason is selected
3. Updates request status to rejected (Approval=2)
4. Records rejection reason and timestamp
5. Refreshes request details grid
6. Provides success feedback

### btnEdit_Click Method

```csharp
protected void btnEdit_Click(object sender, EventArgs e)
```

**Purpose**: Modifies item quantities in exchange request

**Process**:
1. Validates request selection
2. Validates quantity modification
3. Validates modification reason is selected
4. Updates item quantity in request details
5. Records modification reason and timestamp
6. Refreshes request details grid
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Exchange request header with approval tracking
- **Key Fields**: id, OrderNo, OrderType, Date, Emp, Approval, Active
- **Status Values**: Approval=0 (pending), 1 (approved), 2 (rejected)
- **Usage**: Main table for exchange request workflow tracking

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Exchange request detail items with approval tracking
- **Key Fields**: id, Header_FK, Item_Type_id, item_code, Quntity, Due_Date, UNIT, Approval, QuantityIndicator
- **Status Values**: Approval=0 (pending), 1 (approved), 2 (rejected)
- **Usage**: Main table for exchange request approval workflow

#### **Inventories_Dispense_types**
- **Purpose**: Exchange request type master data
- **Key Fields**: id, Description, active
- **Usage**: Provides request type options for filtering

#### **Inventories_Reasons**
- **Purpose**: Modification and rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides modification and rejection reasons for exchange workflow

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name
- **Usage**: Provides item information for request details

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, arabic_name
- **Usage**: Provides item type information for request details

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for request details

#### **Inventories_UOM_item_unit**
- **Purpose**: Item unit associations
- **Key Fields**: item_code, unit_id, unit_type_id
- **Usage**: Links items to units for proper unit display

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
empID.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing exchange operations

#### **Employee Group Filtering**
```sql
select distinct rh.id, rh.OrderNo from Inventories_Dispense_Request_Header rh 
inner join Inventories_Dispense_Request_Details rd on rd.Header_FK=rh.id  
where rh.Date =FORMAT(GETDATE(), 'yyyy-MM-dd') and OrderType=@orderType and rh.Approval=0 and Active='true' 
and convert(nvarchar,Emp) in ((select distinct EmpID from [Orman].[dbo].DefinitionEmployee1 where empgroup in (select ID from [Orman].[dbo].Setup_Employee_Group where @emp in (emp_res1,emp_res2))))
```

**Filtering Logic**: Shows only requests from current date with pending approval
**Permission Logic**: Only requests from employee's group are accessible
**Validation**: Ensures user has access to request's employee group

## Client-Side JavaScript

### AutoPostBack Handling

```javascript
// AutoPostBack controls handle server-side events
// BootstrapComboBox with AutoPostBack="true"
// BootstrapTextBox with AutoPostBack="true"
```

**AutoPostBack Logic**: Controls automatically post back to server on selection/input
**User Experience**: Provides immediate feedback and data updates
**Usage**: Applied to request type, request number, quantity, and reason dropdowns

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
<dx:BootstrapLayoutItem Caption="نوع طلب الصرف" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="6">
```

#### **2. Request Details Grid Section**
```html
<!-- Request Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdShowDetails" runat="server" OnSelectionChanged="grdShowDetails_SelectionChanged">
```

#### **3. Modification Section**
```html
<!-- Modification Section -->
<dx:BootstrapLayoutItem Caption="تعديل الكمية" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="سبب التعديل" ColSpanMd="4">
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
```

#### **4. Approval and Rejection Section**
```html
<!-- Approval and Rejection Section -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2" BeginRow="true">
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Request Type Data Source
SqlDataSource DespinsDS = new SqlDataSource();
DespinsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DespinsDS.SelectCommand = "select id,Description from Inventories_Dispense_types where id not in (4,8,9)";

// Request Number Data Source
SqlDataSource OrderNumDS = new SqlDataSource();
OrderNumDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
OrderNumDS.SelectCommand = "select distinct rh.id, rh.OrderNo from Inventories_Dispense_Request_Header rh inner join Inventories_Dispense_Request_Details rd on rd.Header_FK=rh.id where rh.Date =FORMAT(GETDATE(), 'yyyy-MM-dd') and OrderType=@orderType and rh.Approval=0 and Active='true' and convert(nvarchar,Emp) in ((select distinct EmpID from [Orman].[dbo].DefinitionEmployee1 where empgroup in (select ID from [Orman].[dbo].Setup_Employee_Group where @emp in (emp_res1,emp_res2))))";

// Request Details Data Source
SqlDataSource dsshowItems = new SqlDataSource();
dsshowItems.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsshowItems.SelectCommand = "select dr.id,ty.arabic_name, iss.arabic_name as ar_name,dr.item_code,dr.Quntity,dr.Due_Date, (SELECT distinct Top(1) description FROM Inventories_Item_Settings S inner join Inventories_UOM_item_unit U on U.item_code = S.item_code inner join Inventories_UOM UO on unit_id =UO.id where unit_type_id=4 and S.item_code = dr.item_code) AS UNIT from Inventories_Dispense_Request_Details dr inner join Inventories_item_type ty on ty.id=dr.Item_Type_id inner join Inventories_Item_Settings iss on iss.item_code=dr.item_code where Header_FK=@fk_Header";

// Modification Reason Data Source
SqlDataSource reasonDS1 = new SqlDataSource();
reasonDS1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
reasonDS1.SelectCommand = "select id,reason from Inventories_Reasons where type =13";

// Rejection Reason Data Source
SqlDataSource ReasonDs2 = new SqlDataSource();
ReasonDs2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ReasonDs2.SelectCommand = "select id,reason from Inventories_Reasons where type =13";
```

## Business Logic and Validation

### Request Selection Validation

```csharp
protected void cbOrderNum_SelectedIndexChanged(object sender, EventArgs e)
{
    if (cbOrderNum.Value == "" || cbOrderNum.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم الطلب');", true);
        return;
    }
    else
    {
        dsshowItems.SelectParameters["fk_Header"].DefaultValue = cbOrderNum.Value.ToString();
        grdShowDetails.DataBind();
    }
}
```

**Request Logic**: Validates request selection before loading details
**Data Binding**: Binds request details grid with filtered records
**Selection Logic**: Clears all selections after binding for clean state

### Request Approval Logic

```csharp
protected void Agree_Click(object sender, EventArgs e)
{
    if (cbOrderNum.Value == "" || cbOrderNum.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم الطلب');", true);
        return;
    }
    else
    {
        cn.ExcuteSQL("update Inventories_Dispense_Request_Header set Approval=1 where id ='" + cbOrderNum.Value.ToString() + "' ");
        grdShowDetails.DataBind();
        grdShowDetails.Selection.UnselectAll();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم قبول الطلب');", true);
    }
}
```

**Approval Logic**: Updates request status to approved
**Selection Logic**: Validates request selection before approval
**Data Update**: Updates Approval field to '1' for approval
**User Feedback**: Provides success message after approval

### Request Rejection Logic

```csharp
protected void Reject_Click(object sender, EventArgs e)
{
    if (cbOrderNum.Value == "" || cbOrderNum.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رقم الطلب');", true);
        return;
    }
    else if (cbReason2.Value == "" || cbReason2.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    else
    {
        cn.ExcuteSQL("update Inventories_Dispense_Request_Header set Approval=2,RejectReason='" + cbReason2.Value.ToString() + "' where id ='" + cbOrderNum.Value.ToString() + "' ");
        grdShowDetails.DataBind();
        grdShowDetails.Selection.UnselectAll();
        cbReason2.Value = "";
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم رفض الطلب');", true);
    }
}
```

**Rejection Logic**: Updates request status to rejected
**Selection Logic**: Validates request selection before rejection
**Reason Logic**: Validates rejection reason is selected
**Data Update**: Updates Approval field to '2' for rejection and records reason
**User Feedback**: Provides success message after rejection

### Quantity Modification Logic

```csharp
protected void btnEdit_Click(object sender, EventArgs e)
{
    if (grdShowDetails.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار السطر');", true);
        return;
    }
    else if (txtQuantity.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (cbReason1.Value == "" || cbReason1.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب التعديل');", true);
        return;
    }
    else
    {
        string id = grdShowDetails.GetSelectedFieldValues("id")[0].ToString();
        cn.ExcuteSQL("update Inventories_Dispense_Request_Details set Quntity='" + txtQuantity.Text + "',ModifyReason='" + cbReason1.Value.ToString() + "' where id ='" + id + "' ");
        grdShowDetails.DataBind();
        grdShowDetails.Selection.UnselectAll();
        txtQuantity.Text = "";
        cbReason1.Value = "";
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم تعديل الكمية');", true);
    }
}
```

**Modification Logic**: Updates item quantity in request details
**Selection Logic**: Validates request detail selection before modification
**Quantity Logic**: Validates quantity is entered
**Reason Logic**: Validates modification reason is selected
**Data Update**: Updates Quntity and ModifyReason fields
**User Feedback**: Provides success message after modification

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Request Type Selection Validation**: Must select request type before loading requests
- **Request Number Selection Validation**: Must select request number before loading details
- **Request Detail Selection Validation**: Must select detail before modification
- **Quantity Validation**: Must enter quantity when modifying
- **Modification Reason Validation**: Must select reason when modifying quantities
- **Rejection Reason Validation**: Must select reason when rejecting requests

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Request Status Validation**: Ensures request has pending approval status
- **Employee Group Validation**: Ensures user has access to request's employee group
- **Request Detail Validation**: Ensures items are pending approval
- **Quantity Validation**: Ensures quantities are positive when modifying

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Employee Group Access**: Ensures user has access to request's employee group
- **Request Access**: Ensures user can access and modify selected requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Approval Success**: "تم قبول الطلب" (Request approved successfully)
- **Rejection Success**: "تم رفض الطلب" (Request rejected successfully)
- **Modification Success**: "تم تعديل الكمية" (Quantity modified successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of request details grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on approval status
- **Status Updates**: Request status updates in real-time

## Integration Points

### External Systems

#### **Exchange Request Management System**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Exchange request header with approval tracking
  - `Inventories_Dispense_Request_Details` - Exchange request detail items with approval tracking
  - `Inventories_Dispense_types` - Exchange request type master data
  - `Inventories_Reasons` - Modification and rejection reason configuration
- **Integration Details**:
  - Exchange request workflow controlled by employee group assignments
  - Request approval tracked at header level
  - Request details tracked at item level
  - Modification and rejection reasons configured per request type
- **Data Flow**:
  - Requests filtered by date and type
  - Request details filtered by request header
  - Approval tracked at header level
  - Modification tracked at detail level

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - `DefinitionEmployee1` - Employee group assignments
  - `Setup_Employee_Group` - Employee group configuration
  - Connection string: `Orman.dbo`
- **Permission System**:
  - Employee group-based access control enforced at database level
  - User authentication required for all exchange operations
  - Employee group filtering based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_item_type` - Item type master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_UOM_item_unit` - Item unit associations
- **Integration Details**:
  - Item information displayed in request details
  - Unit information calculated based on item associations
  - Item type information displayed for categorization
- **Data Flow**:
  - Item details loaded from item master data
  - Unit information calculated from unit associations
  - Item type information displayed for categorization

### Data Exchange

#### **Request and Approval Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Exchange request header
  - `Inventories_Dispense_Request_Details` - Exchange request details
- **Real-time Data**:
  - Request approval status
  - Request detail information
  - Modification and rejection tracking
- **Data Relationships**:
  - Requests linked to employee groups
  - Request details linked to request headers
  - Approval tracked at header level
  - Modification tracked at detail level

#### **Item and Unit Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_item_type` - Item type master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_UOM_item_unit` - Item unit associations
- **Real-time Data**:
  - Item details and descriptions
  - Unit information and calculations
  - Item type categorization
- **Data Relationships**:
  - Items linked to types and units
  - Unit information calculated from associations
  - Item type information displayed for categorization

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع طلب الصرف" Error**
- **Cause**: Request type not selected before loading requests
- **Solution**: Always select request type before loading requests
- **Prevention**: Request type selection is required for all exchange operations

#### **"الرجاء اختيار رقم الطلب" Error**
- **Cause**: Request number not selected before loading details
- **Solution**: Always select request number before loading details
- **Prevention**: Request number selection is required for all exchange operations

#### **"الرجاء اختيار السطر" Error**
- **Cause**: No request detail selected before modification
- **Solution**: Always select request detail before clicking modification button
- **Prevention**: Request detail selection is required for all modification operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered when modifying
- **Solution**: Always enter quantity when modifying item quantities
- **Prevention**: Quantity is required for all modification operations

#### **"الرجاء اختيار سبب التعديل" Error**
- **Cause**: Modification reason not selected when modifying quantities
- **Solution**: Always select modification reason when modifying quantities
- **Prevention**: Modification reason is required for all modification operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected when rejecting requests
- **Solution**: Always select rejection reason when rejecting requests
- **Prevention**: Rejection reason is required for all rejection operations

#### **No Request Details Found**
- **Cause**: Request has no items pending approval
- **Solution**: Verify request has items with Approval=0 status
- **Prevention**: Ensure request has proper approval workflow status

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Exchange Request Approval Access**: Access to exchange request approval operations
- **Employee Group Access**: Access to employee group data
- **Request Access**: Access to requests with approval workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Exchange Request Workflow**: Understanding of exchange request approval process
- **Quantity Modification**: Knowledge of quantity modification and reason selection
- **Request Rejection**: Familiarity with request rejection and reason selection
- **Employee Group Management**: Understanding of employee group access control

## Usage Examples

### Basic Exchange Request Approval Workflow

1. **Page Load**: Verify page loads with default settings
2. **Request Type Selection**: Select exchange request type for filtering
3. **Request Selection**: Select request number from available requests
4. **Detail Review**: Review request items in grid
5. **Request Approval**: Click approval button to approve request
6. **Status Update**: Verify request status updates to approved
7. **Success Feedback**: Confirm approval success message

### Quantity Modification Workflow

1. **Request Selection**: Select request with items to modify
2. **Detail Selection**: Select specific item detail for modification
3. **Quantity Entry**: Enter new quantity for item
4. **Reason Selection**: Select modification reason
5. **Modification Execution**: Click modification button
6. **Status Update**: Verify item quantity updated
7. **Success Feedback**: Confirm modification success message

### Request Rejection Workflow

1. **Request Selection**: Select request to reject
2. **Reason Selection**: Select rejection reason
3. **Rejection Execution**: Click rejection button
4. **Status Update**: Verify request status updated to rejected
5. **Reason Recording**: Verify rejection reason recorded
6. **Success Feedback**: Confirm rejection success message

### Multi-Item Request Management

1. **Request Selection**: Select request with multiple items
2. **Item Review**: Review all items in request details grid
3. **Selective Modification**: Modify specific items as needed
4. **Approval Decision**: Approve or reject entire request
5. **Status Tracking**: Monitor request status progression
6. **Audit Trail**: Review modification and rejection history
