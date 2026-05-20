← Go back to 
[Inventories Module Documentation](/Inventories)


# ApprovalSpeculation.aspx

## Overview

**File**: `\Inventories\Process\ApprovalSpeculation.aspx`
**Purpose**: Approval system for speculation/inventory valuation requests with committee-based workflow
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, committee members, approval personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document Selection (Required for Approval)**
- **Document Dropdown**: Must select valid document for approval
- **Error Prevention**: System validates document is selected before loading details
- **Data Source**: Inventories_Speculation_HD table with committee requests
- **Default Behavior**: User must select document manually
- **Error Message**: Validation prevents details loading without document selection
- **Validation**: Only documents with 'third' status are available

#### 2. **Approval Decision (Required for Processing)**
- **Approval Button**: Must click approval button to confirm request
- **Error Prevention**: System validates document is selected before approval
- **Data Source**: User interaction with approval button
- **Default Behavior**: User must click approval button manually
- **Error Message**: Validation prevents approval without document selection
- **Validation**: Only valid documents can be approved

#### 3. **Rejection Decision (Required for Processing)**
- **Rejection Button**: Must click rejection button to reject request
- **Error Prevention**: System validates document is selected before rejection
- **Data Source**: User interaction with rejection button
- **Default Behavior**: User must click rejection button manually
- **Error Message**: Validation prevents rejection without document selection
- **Validation**: Only valid documents can be rejected

#### 4. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without reason selection
- **Validation**: Only active rejection reasons are available

### Common Error Scenarios and Prevention

#### **Document Selection Errors**
- **Error**: No document selected
- **Prevention**: Always select document before loading details
- **Error**: Document not in 'third' status
- **Prevention**: Verify document status before selection
- **Error**: Document not found
- **Prevention**: Verify document exists in system

#### **Approval and Rejection Errors**
- **Error**: No document selected for approval
- **Prevention**: Always select document before approval
- **Error**: No document selected for rejection
- **Prevention**: Always select document before rejection
- **Error**: No rejection reason selected
- **Prevention**: Always select rejection reason before rejection

#### **Processing Management Errors**
- **Error**: Approval fails
- **Prevention**: Ensure document is valid before approval
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected before rejection
- **Error**: Document status update fails
- **Prevention**: Ensure proper permissions for status updates

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have approval permissions** via employee group assignments
3. **Documents must be in 'third' status** for approval
4. **Rejection reasons must be configured** in the system
5. **Approval workflow must be enabled** for speculation requests

#### **Required System State**
- User authentication must be active
- Approval permissions must be configured
- Document data must be current
- Rejection reason data must be current
- Approval workflow must be enabled

### Success Criteria

#### **For Document Selection**
- ✅ Document dropdown populated with 'third' status documents only
- ✅ Document validation ensures proper details loading
- ✅ Document selection enables details display
- ✅ Document status shows current approval state

#### **For Approval Processing**
- ✅ Approval button processes document successfully
- ✅ Document status updates to approved
- ✅ Approval confirmation provides success feedback
- ✅ Document details refresh after approval

#### **For Rejection Processing**
- ✅ Rejection button processes document successfully
- ✅ Rejection reason selection enables rejection
- ✅ Document status updates to rejected
- ✅ Rejection confirmation provides success feedback

#### **For Data Management**
- ✅ Document details grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for approval processing

### Document Selection Section

```html
<!-- Document Selection -->
<dx:BootstrapLayoutItem Caption=" رقم المستند واسم اللجنة" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbFileId" DropDownStyle="DropDown" TextField="check_Name" ValueField="id" DataSourceID="dsInventory" EnableMultiColumn="true" CallbackPageSize="15">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="check_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Document Details Grid Section

```html
<!-- Document Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdDetails" AutoPostBack="true" runat="server" AutoGenerateColumns="False" KeyFieldName="FKFile_HD" EnableCallBacks="false" DataSourceID="dsItemsDetails" CssClasses-Control="margin" OnCustomColumnDisplayText="grdDetails_CustomColumnDisplayText">
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
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Unit" VisibleIndex="10" Caption="وحدة الصرف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="price_Unit" VisibleIndex="11" Caption="سعر الوحدة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="total_Price" VisibleIndex="12" Caption="اجمالى القيمة"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exp_Date" VisibleIndex="13" Caption="تاريخ الصلاحية"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="speculation_Amount" VisibleIndex="14" Caption="كمية التكهين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="speculation_Reason" VisibleIndex="15" Caption="سبب التكهين"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="StockId" VisibleIndex="16" Visible="false"></dx:BootstrapGridViewTextColumn>
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

### Approval and Rejection Section

```html
<!-- Approval and Rejection -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="btnSure" Text="تاكيد" OnClick="btnSure_Click">
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btnReject" runat="server" Text="رفض" OnClick="btnReject_Click">
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

**Document Parameters**:
- `@FILE_ID` - Document ID for filtering details

**User Context Parameters**:
- `@emp` - Employee code for filtering permissions

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Selection**: Loads document details based on selected document
3. **Approval Processing**: Updates document status to approved
4. **Rejection Processing**: Updates document status to rejected with reason
5. **Document Details**: Loads all items for selected document

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default approval state

### btnSure_Click Method

```csharp
protected void btnSure_Click(object sender, EventArgs e)
```

**Purpose**: Approves selected document

**Process**:
1. Validates document selection
2. Updates document status to approved
3. Refreshes document grid
4. Provides success feedback

### btnReject_Click Method

```csharp
protected void btnReject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected document with reason

**Process**:
1. Validates document selection
2. Validates rejection reason selection
3. Updates document status to rejected
4. Refreshes document grid
5. Provides success feedback

### grdDetails_CustomColumnDisplayText Method

```csharp
protected void grdDetails_CustomColumnDisplayText(object sender, DevExpress.Web.ASPxGridViewColumnDisplayTextEventArgs e)
```

**Purpose**: Customizes column display text

**Process**:
1. Handles custom column formatting
2. Updates display text as needed
3. Provides proper formatting for data

## Database Integration

### Core Database Tables

#### **Inventories_Speculation_HD**
- **Purpose**: Speculation request header records
- **Key Fields**: id, check_Name, status
- **Usage**: Tracks speculation requests with approval workflow
- **Filtering**: Only documents with 'third' status

#### **Inventories_speculation_DTL**
- **Purpose**: Speculation request detail records
- **Key Fields**: FKFile_HD, inventory_Name, inventory_code, item_Kind, item_Kind_code, item_Name, item_Name_code, batch_No, available_amount, storage_Unit, price_Unit, total_Price, exp_Date, speculation_Amount, speculation_Reason, StockId
- **Usage**: Tracks items in each speculation request

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for approval workflow
- **Filtering**: Only active reasons with type=10

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing approval operations

## Client-Side JavaScript

### AutoPostBack Handling

```html
<dx:BootstrapComboBox runat="server" AutoPostBack="true" ID="cbFileId" ...>
```

**AutoPostBack**: Enables automatic postback on selection changes
**User Experience**: Provides immediate feedback when selections change
**Server Integration**: Coordinates with server-side event handling

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
            <dx:BootstrapComboBox ID="cbFileId" runat="server" AutoPostBack="true" ...>
```

#### **2. Document Details Grid Section**
```html
<!-- Document Details Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grdDetails" runat="server" ...>
```

#### **3. Approval and Rejection Section**
```html
<!-- Approval and Rejection -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btnSure" runat="server" OnClick="btnSure_Click">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Document Data Source
SqlDataSource dsInventory = new SqlDataSource();
dsInventory.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsInventory.SelectCommand = "select id,check_Name from Inventories_Speculation_HD where status='third'";

// Document Details Data Source
SqlDataSource dsItemsDetails = new SqlDataSource();
dsItemsDetails.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsItemsDetails.SelectCommand = "select FKFile_HD,inventory_Name,inventory_code,item_Kind,item_Kind_code,item_Name,item_Name_code,batch_No,available_amount,storage_Unit,price_Unit,total_Price,exp_Date,speculation_Amount,speculation_Reason,StockId from Inventories_speculation_DTL dt inner join Inventories_Speculation_HD hd on hd.id=dt.FKFile_HD where FKFile_HD=@FILE_ID and hd.status='third'";

// Rejection Reasons Data Source
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=10";
```

## Business Logic and Validation

### Document Selection Validation

```csharp
protected void btnSure_Click(object sender, EventArgs e)
{
    if (cbFileId.Value == "" || cbFileId.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المستند');", true);
        return;
    }
    // ... additional validation
}
```

**Document Logic**: Validates document selection before approval
**Error Prevention**: Prevents approval without proper document selection

### Rejection Reason Validation

```csharp
protected void btnReject_Click(object sender, EventArgs e)
{
    if (cbFileId.Value == "" || cbFileId.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المستند');", true);
        return;
    }
    else if (cbReasons.Value == "" || cbReasons.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    // ... additional validation
}
```

**Rejection Logic**: Validates document and rejection reason selection before rejection
**Error Prevention**: Prevents rejection without proper document and reason selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Selection Validation**: Must select document before approval or rejection
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Validation**: Ensures document is in 'third' status
- **Approval Validation**: Ensures document can be approved
- **Rejection Validation**: Ensures rejection reason is active and available
- **Status Validation**: Ensures document status updates properly

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Approval Access**: Ensures user has access to approval operations
- **Document Access**: Ensures user can access and modify document records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Approval Success**: "تم تأكيد المستند" (Document approved successfully)
- **Rejection Success**: "تم رفض المستند" (Document rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of document details grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Approval Management System**
- **Database Tables**:
  - `Inventories_Speculation_HD` - Speculation request header records
  - `Inventories_speculation_DTL` - Speculation request detail records
- **Integration Details**:
  - Approval workflow controlled by document selection
  - Document status tracked with approval workflow
  - Rejection reasons configured for approval process
- **Data Flow**:
  - Documents filtered by 'third' status
  - Approval status updates properly
  - Rejection reasons applied correctly

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Permission System**:
  - User authentication required for all approval operations
  - Approval permissions configured via employee group assignments

### Data Exchange

#### **Document and Approval Information**
- **Database Tables**:
  - `Inventories_Speculation_HD` - Speculation request header records
  - `Inventories_speculation_DTL` - Speculation request detail records
- **Real-time Data**:
  - Document information for approval
  - Document details for review
  - Approval status updates
- **Data Relationships**:
  - Documents linked to details via FKFile_HD
  - Approval status tracked in header records
  - Rejection reasons applied to rejected documents

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المستند" Error**
- **Cause**: Document not selected before approval or rejection
- **Solution**: Always select document before approval or rejection
- **Prevention**: Document selection is required for all approval operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **Document Not Found Error**
- **Cause**: Selected document not in 'third' status
- **Solution**: Verify document status before selection
- **Prevention**: Only documents with 'third' status are available

#### **Approval Failed Error**
- **Cause**: Document cannot be approved
- **Solution**: Verify document is valid for approval
- **Prevention**: Ensure document is in proper status for approval

#### **Rejection Failed Error**
- **Cause**: Document cannot be rejected
- **Solution**: Verify rejection reason is selected and active
- **Prevention**: Ensure rejection reason is configured properly

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Approval Access**: Access to approval operations
- **Document Access**: Access to documents with 'third' status

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Approval Workflow**: Understanding of approval process
- **Document Management**: Knowledge of document selection and status
- **Rejection Management**: Understanding of rejection reason selection

## Usage Examples

### Basic Approval Workflow

1. **Page Load**: Verify user is logged in with proper permissions
2. **Document Selection**: Select document from dropdown
3. **Document Review**: Review document details in grid
4. **Approval Decision**: Click approval button to confirm
5. **Approval Confirmation**: Verify approval success feedback

### Rejection Workflow

1. **Page Load**: Verify user is logged in with proper permissions
2. **Document Selection**: Select document from dropdown
3. **Document Review**: Review document details in grid
4. **Rejection Reason Selection**: Select rejection reason from dropdown
5. **Rejection Decision**: Click rejection button to reject
6. **Rejection Confirmation**: Verify rejection success feedback

### Multi-Document Approval Management

1. **Document Review**: Review all documents in dropdown
2. **Selective Approval**: Approve specific documents as needed
3. **Selective Rejection**: Reject specific documents with reasons
4. **Status Monitoring**: Monitor document status changes
5. **Approval Completion**: Complete all approval operations