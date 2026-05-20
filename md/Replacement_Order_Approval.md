← Go back to 
[Inventories Module Documentation](/Inventories)


# Replacement_Order_Approval.aspx

## Overview

**File**: `\Inventories\Process\Replacement_Order_Approval.aspx`
**Purpose**: Replacement order approval system for reviewing and approving replacement requests
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, approval personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Replacement Order Selection (Required for Approval)**
- **Replacement Order Dropdown**: Must select valid replacement order for approval
- **Error Prevention**: System validates order is selected before loading details
- **Data Source**: Inventories_exchangeHeader table with order information
- **Default Behavior**: User must select order manually
- **Error Message**: Validation prevents order loading without order selection
- **Validation**: Only orders with status='1' are available

#### 2. **Order Review (Required for Approval)**
- **Order Grid Review**: Must review all order items before approval
- **Error Prevention**: System displays all items for review before approval
- **Data Source**: Inventories_exchangeDetails table with order items
- **Default Behavior**: User must review items before approval
- **Error Message**: No validation required as this is review only
- **Validation**: All items displayed for review

#### 3. **Approval Action (Required for Approval)**
- **Approve Button**: Must click approve button to approve order
- **Error Prevention**: System validates approval action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click approve button manually
- **Error Message**: Validation prevents approval without user action
- **Validation**: Approval action must be explicitly selected

#### 4. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason for rejection
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without rejection reason selection
- **Validation**: Only active rejection reasons with type=15 are available

### Common Error Scenarios and Prevention

#### **Replacement Order Selection Errors**
- **Error**: No replacement order selected
- **Prevention**: Always select replacement order before loading details
- **Error**: Order has no items pending approval
- **Prevention**: Verify order has items pending approval

#### **Approval Errors**
- **Error**: Approval fails
- **Prevention**: Ensure order is selected before approval
- **Error**: Items not reviewed
- **Prevention**: Review all items before approval

#### **Rejection Errors**
- **Error**: Rejection fails
- **Prevention**: Ensure rejection reason is selected before rejection
- **Error**: Rejection reason not selected
- **Prevention**: Always select rejection reason before rejection

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have approval permissions** via employee group assignments
3. **Replacement orders must be pending approval** in the system
4. **Items must be available** for approval

#### **Required System State**
- User authentication must be active
- Approval permissions must be configured
- Replacement order data must be current
- Item data must be available

### Success Criteria

#### **For Replacement Order Selection**
- ✅ Replacement order dropdown populated with pending orders only
- ✅ Order validation ensures proper item loading
- ✅ Order selection enables item display

#### **For Order Review**
- ✅ Item grid displays all items for selected order
- ✅ Item details show complete order information
- ✅ Review functionality works properly
- ✅ Total calculations are accurate

#### **For Approval Management**
- ✅ Approval creates proper approval records
- ✅ Order selection enables approval workflow
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
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for replacement order approval

### Replacement Order Selection Section

```html
<!-- Replacement Order Selection -->
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

### Order Items Grid Section

```html
<!-- Order Items Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grid" runat="server" EnableCallBacks="false" AutoPostBack="true" KeyFieldName="ID" CssClasses-Control="cc" DataSourceID="details" OnCustomColumnDisplayText="grid_CustomColumnDisplayText">
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

### Approval and Rejection Section

```html
<!-- Approval and Rejection -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btn_approve" runat="server" AutoPostBack="true" EnableCallbackMode="false" Text="تأكيد مراجعة الطلب" Width="100%" OnClick="btn_approve_Click">
                <CssClasses Icon="simple-icon-Cursor" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btn_reject" runat="server" AutoPostBack="true" EnableCallbackMode="false" Text="رفض الطلب" Width="100%" OnClick="btn_reject_Click">
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

The system uses multiple parameters for comprehensive data filtering:

**Order Parameters**:
- `@Header_FK` - Order header ID for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Order Selection**: Loads items based on selected order
3. **Item Review**: Displays all items for review
4. **Approval**: Processes approval for selected order
5. **Rejection**: Processes rejection for selected order with reason

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads order information
3. Sets default approval state
4. Initializes date displays

### btn_approve_Click Method

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
```

**Purpose**: Approves selected order

**Process**:
1. Validates order selection
2. Validates approval permissions
3. Updates order status to approved
4. Refreshes item grid
5. Provides success feedback

### btn_reject_Click Method

```csharp
protected void btn_reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected order with reason

**Process**:
1. Validates order selection
2. Validates rejection reason selection
3. Updates order status to rejected
4. Refreshes item grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_exchangeHeader**
- **Purpose**: Exchange order header information
- **Key Fields**: ID, status, exchange_SupplierCode, exchange_SupplyInvoiceNumber, checkNum
- **Usage**: Tracks exchange order information for approval
- **Filtering**: Only orders with status='1'

#### **Inventories_exchangeDetails**
- **Purpose**: Exchange order details with item information
- **Key Fields**: ID, Header_FK, item_Code, item_Name, Replacementquantity, batch_No, exp_Date, inventory_code, storage_Unit, stock, price_Unit, total_Price, SupplierCode, SupplyInvoiceNumber, exchange_iteemCode, exchange_iteemName, exchange_quanyity, exchange_priceUnit, exchange_totalPrice, exchange_ExpDate, exchange_purchaseUnit, exchange_SupplierCode, exchange_SupplyInvoiceNumber, stock_FK, checkNum
- **Usage**: Tracks exchange order items for approval
- **Filtering**: Only items for selected order

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active
- **Usage**: Provides store information for display
- **Filtering**: Only active stores

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name
- **Usage**: Provides supplier information for display

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for rejection
- **Filtering**: Only active reasons with type=15

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing approval data

#### **Order Filtering**
```sql
SELECT ID FROM Inventories_exchangeHeader WHERE status='1'
```

**Filtering Logic**: Shows only orders pending approval
**Permission Logic**: Only orders pending approval are available
**Validation**: Ensures order has items pending approval

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to order and rejection reason dropdowns

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
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Replacement Order Selection Section**
```html
<!-- Replacement Order Selection -->
<dx:BootstrapLayoutItem Caption="رقم طلب الاستبدال" ColSpanMd="6">
```

#### **2. Order Items Grid Section**
```html
<!-- Order Items Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

#### **3. Approval and Rejection Section**
```html
<!-- Approval and Rejection -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Order Data Source
SqlDataSource orders = new SqlDataSource();
orders.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
orders.SelectCommand = "SELECT ID FROM Inventories_exchangeHeader WHERE status='1'";

// Order Items Data Source
SqlDataSource details = new SqlDataSource();
details.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details.SelectCommand = "SELECT dt.ID, Header_FK, (select arabic_name from Inventories_Item_Settings iis where iis.item_code=dt.item_Code) as item_Name, item_Code, batch_No, exp_Date, inventory_code, (select arabic_name from Inventories_wharehouse_store ws where ws.id= inventory_code) as inventory_Name, storage_Unit, stock, price_Unit, total_Price, SupplierCode, (select Arabic_name from purches_Supplier_record where Supplier_code=SupplierCode) as suppliername, SupplyInvoiceNumber, Replacementquantity, (select arabic_name from Inventories_Item_Settings iis where iis.item_code=exchange_iteemCode) as exchange_iteemName, exchange_iteemCode, exchange_ExpDate, exchange_purchaseUnit, (select description from Inventories_UOM where id=exchange_purchaseUnit) as exchange_unit, exchange_quanyity, exchange_priceUnit, exchange_totalPrice, hd.exchange_SupplierCode, (select Arabic_name from purches_Supplier_record where Supplier_code=hd.exchange_SupplierCode) as exchange_suppliername, hd.exchange_SupplyInvoiceNumber, stock_FK, hd.checkNum FROM Inventories_exchangeDetails dt INNER JOIN Inventories_exchangeHeader hd ON dt.[Header_FK]=hd.[ID] WHERE Header_FK=@Header_FK and hd.[status]='1'";

// Rejection Reason Data Source
SqlDataSource reasons = new SqlDataSource();
reasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
reasons.SelectCommand = "SELECT id, reason FROM Inventories_Reasons WHERE type=15 AND active=1";
```

## Business Logic and Validation

### Order Selection Validation

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
{
    if (drp_order.Value == "" || drp_order.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طلب الاستبدال');", true);
        return;
    }
    // ... additional validation
}
```

**Order Logic**: Validates order selection before approval
**Error Prevention**: Prevents approval without order selection

### Approval Validation

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
{
    if (drp_order.Value == "" || drp_order.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طلب الاستبدال');", true);
        return;
    }
    // ... additional validation
}
```

**Approval Logic**: Validates order selection before approval
**Error Prevention**: Prevents approval without order selection

### Rejection Reason Validation

```csharp
protected void btn_reject_Click(object sender, EventArgs e)
{
    if (drp_reject.Value == "" || drp_reject.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار سبب الرفض');", true);
        return;
    }
    // ... additional validation
}
```

**Rejection Reason Logic**: Validates rejection reason before rejection
**Error Prevention**: Prevents rejection without rejection reason

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Order Selection Validation**: Must select order before loading items
- **Approval Validation**: Must select order before approval
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Order Validation**: Ensures order is pending approval
- **Item Validation**: Ensures items are pending approval
- **Rejection Reason Validation**: Ensures rejection reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Order Access**: Ensures user has access to selected order
- **Approval Access**: Ensures user can access and modify approval records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Approval Success**: "تم تأكيد مراجعة الطلب" (Order approval confirmed successfully)
- **Rejection Success**: "تم رفض الطلب" (Order rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of item grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Replacement Order Management System**
- **Database Tables**:
  - `Inventories_exchangeHeader` - Exchange order header information
  - `Inventories_exchangeDetails` - Exchange order item details
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_UOM` - Unit of measure master data
  - `purches_Supplier_record` - Supplier master data
  - `Inventories_Reasons` - Rejection reason master data
- **Integration Details**:
  - Order selection controls item display
  - Items displayed with complete details
  - Approval/rejection tracked with complete information
- **Data Flow**:
  - Orders filtered for user access
  - Items filtered by order
  - Approval/rejection tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all approval operations
  - Order access controlled by user permissions

### Data Exchange

#### **Order and Item Information**
- **Database Tables**:
  - `Inventories_exchangeHeader` - Exchange order header information
  - `Inventories_exchangeDetails` - Exchange order item details
- **Real-time Data**:
  - Order information for approval
  - Item quantities and prices
- **Data Relationships**:
  - Orders linked to items via Header_FK
  - Approval/rejection tracked by user

#### **Item and Approval Information**
- **Database Tables**:
  - `Inventories_exchangeDetails` - Exchange order item details
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Approval quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to approval via item_Code
  - Approval tracked by order
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار طلب الاستبدال" Error**
- **Cause**: Order not selected before loading items
- **Solution**: Always select order before loading items
- **Prevention**: Order selection is required for all approval operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **No Orders Found**
- **Cause**: No orders pending approval
- **Solution**: Verify orders are pending approval
- **Prevention**: Ensure orders are pending approval

#### **Approval Failed Error**
- **Cause**: Approval cannot be processed
- **Solution**: Verify order is selected before approval
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
- **Order Access**: Access to orders with approval items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Approval Workflow**: Understanding of approval process
- **Order Management**: Knowledge of order selection and approval
- **Approval Management**: Familiarity with approval save and rejection operations

## Usage Examples

### Basic Approval Workflow

1. **Page Load**: Verify page loads with default data
2. **Order Selection**: Select order for approval
3. **Item Review**: Review items in order items grid
4. **Approval**: Click approve button to process approval
5. **Rejection**: Click reject button to process rejection with reason

### Rejection Workflow

1. **Order Selection**: Select order for rejection
2. **Item Review**: Review items in order items grid
3. **Rejection Reason Selection**: Select rejection reason
4. **Rejection**: Click reject button to process rejection

### Multi-Order Approval Management

1. **Order Selection**: Select order for approval
2. **Item Review**: Review items for selected order
3. **Approval**: Process approval for selected order
4. **Rejection**: Process rejection for selected order with reason
5. **Completion**: Complete all approval operations