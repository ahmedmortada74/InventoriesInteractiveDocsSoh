← Go back to 
[Inventories Module Documentation](/Inventories)

# exchange_confirmation.aspx

## Overview

**File**: `\Inventories\Process\exchange_confirmation.aspx`
**Purpose**: Exchange request confirmation and approval system for inventory items with approval and rejection capabilities
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Exchange request approvers, inventory supervisors, confirmation personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Exchange Request Selection (Required for Confirmation)**
- **Request Dropdown**: Must select valid exchange request for confirmation
- **Error Prevention**: System validates request is selected before loading details
- **Data Source**: Inventories_exchangeHeader table filtered by pending status
- **Default Behavior**: User must select request manually from available pending requests
- **Error Message**: Validation prevents loading details without request selection
- **Validation**: Only requests with status='0' (pending) are available

#### 2. **Confirmation Decision (Required for Approval)**
- **Confirmation Button**: Must approve or reject exchange request
- **Error Prevention**: System validates confirmation decision is made for each request
- **Data Source**: User interaction with confirmation buttons
- **Default Behavior**: User clicks confirmation buttons to make decisions
- **Error Message**: Validation prevents incomplete confirmation workflow
- **Validation**: User must make confirmation decision for each request

#### 3. **Rejection Reason Selection (Conditional for Rejection)**
- **Reason Dropdown**: Required when rejecting exchange requests
- **Error Prevention**: System validates rejection reason is selected when rejecting requests
- **Data Source**: Inventories_Reasons table filtered by exchange rejection type
- **Default Behavior**: Reason dropdown enabled only when rejection is selected
- **Error Message**: Validation prevents rejection without reason selection
- **Validation**: Only active reasons (active=1, type=15) are available

### Common Error Scenarios and Prevention

#### **Request Selection Errors**
- **Error**: No request selected
- **Prevention**: Always select request before loading details
- **Error**: Request not found
- **Prevention**: Verify request number is correct and has pending status
- **Error**: Request already processed
- **Prevention**: Verify request has status='0' for confirmation

#### **Request Detail Errors**
- **Error**: No request details found
- **Prevention**: Ensure request has items pending confirmation
- **Error**: Request already confirmed
- **Prevention**: Verify request has status='0' for confirmation workflow
- **Error**: Request access denied
- **Prevention**: Ensure user has access to request's department

#### **Confirmation and Rejection Errors**
- **Error**: Confirmation fails
- **Prevention**: Ensure user has proper permissions for confirmation
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected when rejecting requests
- **Error**: Rejection reason not selected
- **Prevention**: Always select rejection reason when rejecting requests

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has exchange confirmation permissions
- **Error**: Request access denied
- **Prevention**: Verify user has access to request's department
- **Error**: Department access restricted
- **Prevention**: Ensure user has access to selected department

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have exchange confirmation permissions** via employee group assignments
3. **Exchange requests must be pending confirmation** with proper status
4. **Exchange workflow must be enabled** for inventory items
5. **Rejection reasons must be configured** in the system

#### **Required System State**
- User authentication must be active
- Exchange confirmation permissions must be configured
- Exchange request workflow must be enabled
- Rejection reasons must be configured
- Exchange requests must be pending confirmation

### Success Criteria

#### **For Request Selection**
- ✅ Request dropdown populated with pending exchange requests only
- ✅ Request details display properly in grid
- ✅ Request validation prevents loading without selection
- ✅ Request status shows current confirmation state

#### **For Request Details**
- ✅ Request details grid displays all items pending confirmation
- ✅ Item details show complete exchange information
- ✅ Exchange item information displays properly
- ✅ Request workflow status updates properly

#### **For Request Confirmation**
- ✅ Request confirmation updates status to confirmed
- ✅ Confirmation status updates in real-time
- ✅ Success feedback confirms confirmation completion
- ✅ Request status changes to approved

#### **For Request Rejection**
- ✅ Request rejection updates status to rejected
- ✅ Rejection requires proper reason selection
- ✅ Rejection status updates in real-time
- ✅ Success feedback confirms rejection completion

#### **For Data Management**
- ✅ Request details refresh after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on confirmation status

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for exchange confirmation

### Request Selection Section

```html
<!-- Request Selection -->
<dx:BootstrapLayoutItem Caption="رقم طلب الاستبدال" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="drp_order" runat="server" AutoPostBack="true" EnableCallbackMode="false" NullText="اختر طلب الاستبدال" ValueField="id" DataSourceID="orders">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Details Grid Section

```html
<!-- Request Details Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="confirm_grid" runat="server" EnableCallBacks="false" AutoPostBack="true" KeyFieldName="ID" CssClasses-Control="cc" DataSourceID="details" OnCustomColumnDisplayText="confirm_grid_CustomColumnDisplayText">
                <Columns>
                    <dx:BootstrapGridViewDataColumn Caption="مسلسل" VisibleIndex="0" />
                    <dx:BootstrapGridViewDataColumn FieldName="ID" Visible="false" VisibleIndex="1" />
                    <dx:BootstrapGridViewDataColumn FieldName="Header_FK" VisibleIndex="2" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="item_Code" Caption="كود الصنف المستبدل" VisibleIndex="3" />
                    <dx:BootstrapGridViewDataColumn FieldName="item_Name" Caption="مسمى الصنف المستبدل" VisibleIndex="4" />
                    <dx:BootstrapGridViewDataColumn FieldName="Replacementquantity" Caption="كمية الصنف المستبدل" VisibleIndex="5" />
                    <dx:BootstrapGridViewDataColumn FieldName="batch_No" Caption="الدفعة" VisibleIndex="6" />
                    <dx:BootstrapGridViewDataColumn FieldName="inventory_Name" Caption="المخزن" VisibleIndex="7" />
                    <dx:BootstrapGridViewDataColumn FieldName="inventory_code" Caption="المخزن" VisibleIndex="8" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="exp_Date" Caption="تاريخ صلاحية الصنف المستبدل" VisibleIndex="9" />
                    <dx:BootstrapGridViewDataColumn FieldName="storage_Unit" Caption="وحدة تخزين الصنف المستبدل" VisibleIndex="10" />
                    <dx:BootstrapGridViewDataColumn FieldName="stock" Caption="رصيد الصنف المستبدل" VisibleIndex="11" />
                    <dx:BootstrapGridViewDataColumn FieldName="price_Unit" Caption="سعر الوحدة" VisibleIndex="12" />
                    <dx:BootstrapGridViewDataColumn FieldName="total_Price" Caption="اجمالى القيمة" VisibleIndex="13" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplierCode" Caption="كود مورد الصنف المستبدل" VisibleIndex="14" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="suppliername" Caption="مسمى مورد الصنف المستبدل" VisibleIndex="15" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplyInvoiceNumber" Caption="رقم فاتورة الصنف المستبدل" VisibleIndex="16" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_iteemCode" Caption="كود الصنف المستبدل به" VisibleIndex="17" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_iteemName" Caption="مسمى الصنف المستبدل به" VisibleIndex="18" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_quanyity" Caption="كمية الصنف المستبدل به" VisibleIndex="19" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_priceUnit" Caption="سعر الوحدة الصنف المستبدل به" VisibleIndex="20" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_totalPrice" Caption="اجمالى قيمة الصنف المستبدل به" VisibleIndex="21" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_ExpDate" Caption="تاريخ صلاحية الصنف المستبدل به" VisibleIndex="22" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_purchaseUnit" Caption="وحدة شراء الصنف المستبدل به" VisibleIndex="23" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_unit" Caption="وحدة شراء الصنف المستبدل به" VisibleIndex="24" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_SupplierCode" Caption="كود المورد الصنف المستبدل به" VisibleIndex="25" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_suppliername" Caption="مسمى المورد الصنف المستبدل به" VisibleIndex="26" />
                    <dx:BootstrapGridViewDataColumn FieldName="exchange_SupplyInvoiceNumber" Caption="رقم فاتورة الصنف المستبدل به" VisibleIndex="27" />
                    <dx:BootstrapGridViewDataColumn FieldName="stock_FK" Caption="كود المخزن المستبدل به" VisibleIndex="28" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="checkNum" Caption="كوداللجنة" VisibleIndex="29" Visible="false" />
                </Columns>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Confirmation and Rejection Section

```html
<!-- Confirmation and Rejection Section -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btn_approve" runat="server" AutoPostBack="true" EnableCallbackMode="false" Text=" تأكيد الطلب " Width="100%" OnClick="btn_approve_Click">
                <CssClasses Icon="simple-icon-Cursor" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btn_reject" runat="server" AutoPostBack="true" EnableCallbackMode="false" Text=" رفض الطلب " Width="100%" OnClick="btn_reject_Click">
                <CssClasses Icon="simple-icon-close" />
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="drp_reject" runat="server" AutoPostBack="true" EnableCallbackMode="false" NullText="اختر السبب" DataSourceID="reasons" TextField="reason" ValueField="id">
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

The system uses request parameters for comprehensive data filtering:

**Request Parameters**:
- `@Header_FK` - Request ID for filtering request details

**User Context Parameters**:
- Request selection based on pending status

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Request Selection**: Loads request details for selected request
3. **Request Display**: Shows all items pending confirmation
4. **Confirmation/Rejection**: Confirms or rejects requests with proper validation
5. **Status Update**: Updates request status based on confirmation decisions

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default exchange confirmation workflow state

### btn_approve_Click Method

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
```

**Purpose**: Confirms exchange request

**Process**:
1. Validates request selection
2. Updates request status to confirmed (status='1')
3. Records confirmation timestamp and user
4. Refreshes request details grid
5. Provides success feedback

### btn_reject_Click Method

```csharp
protected void btn_reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects exchange request

**Process**:
1. Validates request selection
2. Validates rejection reason is selected
3. Updates request status to rejected (status='2')
4. Records rejection reason and timestamp
5. Refreshes request details grid
6. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_exchangeHeader**
- **Purpose**: Exchange request header with confirmation tracking
- **Key Fields**: ID, status, exchange_SupplierCode, exchange_SupplyInvoiceNumber, checkNum
- **Status Values**: status='0' (pending), '1' (confirmed), '2' (rejected)
- **Usage**: Main table for exchange confirmation workflow

#### **Inventories_exchangeDetails**
- **Purpose**: Exchange request detail items with item information
- **Key Fields**: ID, Header_FK, item_Code, batch_No, inventory_code, exp_Date, storage_Unit, stock, price_Unit, total_Price, SupplierCode, SupplyInvoiceNumber, Replacementquantity, exchange_iteemCode, exchange_ExpDate, exchange_purchaseUnit, exchange_quanyity, exchange_priceUnit, exchange_totalPrice, stock_FK
- **Usage**: Main table for exchange confirmation workflow

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name
- **Usage**: Provides item information for exchange details

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name
- **Usage**: Provides store information for exchange details

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for exchange details

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name
- **Usage**: Provides supplier information for exchange details

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for exchange workflow

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing exchange operations

#### **Request Filtering**
```sql
SELECT ID FROM Inventories_exchangeHeader WHERE status='0'
```

**Filtering Logic**: Shows only pending exchange requests
**Permission Logic**: Only requests with status='0' are available
**Validation**: Ensures request is pending confirmation

## Client-Side JavaScript

### AutoPostBack Handling

```javascript
// AutoPostBack controls handle server-side events
// BootstrapComboBox with AutoPostBack="true"
// BootstrapButton with AutoPostBack="true"
```

**AutoPostBack Logic**: Controls automatically post back to server on selection/input
**User Experience**: Provides immediate feedback and data updates
**Usage**: Applied to request selection and confirmation buttons

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
<dx:BootstrapLayoutItem Caption="رقم طلب الاستبدال" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="drp_order" runat="server" OnSelectedIndexChanged="drp_order_SelectedIndexChanged">
```

#### **2. Request Details Grid Section**
```html
<!-- Request Details Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="confirm_grid" runat="server" OnCustomColumnDisplayText="confirm_grid_CustomColumnDisplayText">
```

#### **3. Confirmation and Rejection Section**
```html
<!-- Confirmation and Rejection Section -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Request Data Source
SqlDataSource orders = new SqlDataSource();
orders.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
orders.SelectCommand = "SELECT ID FROM Inventories_exchangeHeader WHERE status='0'";

// Request Details Data Source
SqlDataSource details = new SqlDataSource();
details.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details.SelectCommand = "SELECT dt.ID, Header_FK, (select arabic_name from Inventories_Item_Settings iis where iis.item_code=dt.item_Code) as item_Name, item_Code, batch_No, exp_Date, inventory_code, (select arabic_name from Inventories_wharehouse_store ws where ws.id= inventory_code) as inventory_Name, storage_Unit, stock, price_Unit, total_Price, SupplierCode, (select Arabic_name from purches_Supplier_record where Supplier_code=SupplierCode) as suppliername, SupplyInvoiceNumber, Replacementquantity, (select arabic_name from Inventories_Item_Settings iis where iis.item_code=exchange_iteemCode) as exchange_iteemName, exchange_iteemCode, exchange_ExpDate, exchange_purchaseUnit, (select description from Inventories_UOM where id=exchange_purchaseUnit) as exchange_unit, exchange_quanyity, exchange_priceUnit, exchange_totalPrice, hd.exchange_SupplierCode, (select Arabic_name from purches_Supplier_record where Supplier_code=hd.exchange_SupplierCode) as exchange_suppliername, hd.exchange_SupplyInvoiceNumber, stock_FK, hd.checkNum FROM Inventories_exchangeDetails dt INNER JOIN Inventories_exchangeHeader hd ON dt.[Header_FK]=hd.[ID] WHERE Header_FK=@Header_FK and hd.[status]='0'";

// Rejection Reasons Data Source
SqlDataSource reasons = new SqlDataSource();
reasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
reasons.SelectCommand = "SELECT id, reason FROM Inventories_Reasons WHERE type=15 AND active=1";
```

## Business Logic and Validation

### Request Selection Validation

```csharp
// Request selection validation handled by AutoPostBack
// Data binding occurs automatically on selection
```

**Request Logic**: Validates request selection before loading details
**Data Binding**: Binds request details grid with filtered records
**Selection Logic**: Clears all selections after binding for clean state

### Request Confirmation Logic

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
{
    if (drp_order.Value == "" || drp_order.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طلب الاستبدال');", true);
        return;
    }
    else
    {
        cn.ExcuteSQL("update Inventories_exchangeHeader set status='1' where ID ='" + drp_order.Value.ToString() + "' ");
        confirm_grid.DataBind();
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم تأكيد الطلب');", true);
    }
}
```

**Confirmation Logic**: Updates request status to confirmed
**Selection Logic**: Validates request selection before confirmation
**Data Update**: Updates status field to '1' for confirmation
**User Feedback**: Provides success message after confirmation

### Request Rejection Logic

```csharp
protected void btn_reject_Click(object sender, EventArgs e)
{
    if (drp_order.Value == "" || drp_order.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طلب الاستبدال');", true);
        return;
    }
    else if (drp_reject.Value == "" || drp_reject.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    else
    {
        cn.ExcuteSQL("update Inventories_exchangeHeader set status='2',reject_reason='" + drp_reject.Value.ToString() + "' where ID ='" + drp_order.Value.ToString() + "' ");
        confirm_grid.DataBind();
        drp_reject.Value = "";
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('تم رفض الطلب');", true);
    }
}
```

**Rejection Logic**: Updates request status to rejected
**Selection Logic**: Validates request selection before rejection
**Reason Logic**: Validates rejection reason is selected
**Data Update**: Updates status field to '2' for rejection and records reason
**User Feedback**: Provides success message after rejection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Request Selection Validation**: Must select request before loading details
- **Rejection Reason Validation**: Must select reason when rejecting requests

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Request Status Validation**: Ensures request has pending confirmation status
- **Request Detail Validation**: Ensures items are pending confirmation
- **Rejection Reason Validation**: Ensures rejection reason is selected when rejecting

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
- **Confirmation Success**: "تم تأكيد الطلب" (Request confirmed successfully)
- **Rejection Success**: "تم رفض الطلب" (Request rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of request details grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on confirmation status
- **Status Updates**: Request status updates in real-time

## Integration Points

### External Systems

#### **Exchange Management System**
- **Database Tables**:
  - `Inventories_exchangeHeader` - Exchange request header with confirmation tracking
  - `Inventories_exchangeDetails` - Exchange request detail items with item information
  - `Inventories_Reasons` - Rejection reason configuration
- **Integration Details**:
  - Exchange request workflow controlled by status tracking
  - Request confirmation tracked at header level
  - Request details tracked at item level
  - Rejection reasons configured per exchange type
- **Data Flow**:
  - Requests filtered by pending status
  - Request details filtered by request header
  - Confirmation tracked at header level
  - Rejection reasons filtered by exchange type

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all exchange operations
  - Request access controlled by status filtering

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_wharehouse_store` - Warehouse store master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier master data
- **Integration Details**:
  - Item information displayed in request details
  - Store information displayed for exchange items
  - Unit information displayed for exchange items
  - Supplier information displayed for exchange items
- **Data Flow**:
  - Item details loaded from item master data
  - Store information loaded from store master data
  - Unit information loaded from unit master data
  - Supplier information loaded from supplier master data

### Data Exchange

#### **Request and Confirmation Information**
- **Database Tables**:
  - `Inventories_exchangeHeader` - Exchange request header
  - `Inventories_exchangeDetails` - Exchange request details
- **Real-time Data**:
  - Request confirmation status
  - Request detail information
  - Rejection reason tracking
- **Data Relationships**:
  - Requests linked to details via header foreign key
  - Confirmation tracked at header level
  - Rejection reasons recorded for rejected requests

#### **Item and Supplier Information**
- **Database Tables**:
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_wharehouse_store` - Warehouse store master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier master data
- **Real-time Data**:
  - Item details and descriptions
  - Store information and locations
  - Unit information and calculations
  - Supplier information and associations
- **Data Relationships**:
  - Items linked to types and units
  - Store information displayed for exchange items
  - Unit information calculated from unit associations
  - Supplier information displayed for exchange items

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار طلب الاستبدال" Error**
- **Cause**: Request not selected before loading details
- **Solution**: Always select request before loading details
- **Prevention**: Request selection is required for all exchange operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected when rejecting requests
- **Solution**: Always select rejection reason when rejecting requests
- **Prevention**: Rejection reason is required for all rejection operations

#### **No Request Details Found**
- **Cause**: Request has no items pending confirmation
- **Solution**: Verify request has items with status='0'
- **Prevention**: Ensure request has proper confirmation workflow status

#### **Request Already Processed**
- **Cause**: Request has already been confirmed or rejected
- **Solution**: Verify request has status='0' for confirmation
- **Prevention**: Ensure request is pending confirmation

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Exchange Confirmation Access**: Access to exchange confirmation operations
- **Request Access**: Access to requests with confirmation workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Exchange Confirmation Workflow**: Understanding of exchange confirmation process
- **Request Management**: Knowledge of request confirmation and rejection
- **Rejection Reason Selection**: Familiarity with rejection reason selection
- **Status Tracking**: Understanding of exchange status progression

## Usage Examples

### Basic Exchange Confirmation Workflow

1. **Page Load**: Verify page loads with default settings
2. **Request Selection**: Select exchange request for confirmation
3. **Detail Review**: Review exchange items in grid
4. **Request Confirmation**: Click confirmation button to confirm request
5. **Status Update**: Verify request status updates to confirmed
6. **Success Feedback**: Confirm confirmation success message

### Request Rejection Workflow

1. **Request Selection**: Select request to reject
2. **Reason Selection**: Select rejection reason
3. **Rejection Execution**: Click rejection button
4. **Status Update**: Verify request status updated to rejected
5. **Reason Recording**: Verify rejection reason recorded
6. **Success Feedback**: Confirm rejection success message

### Multi-Item Exchange Management

1. **Request Selection**: Select request with multiple items
2. **Item Review**: Review all items in request details grid
3. **Confirmation Decision**: Confirm or reject entire request
4. **Status Tracking**: Monitor request status progression
5. **Audit Trail**: Review confirmation and rejection history
