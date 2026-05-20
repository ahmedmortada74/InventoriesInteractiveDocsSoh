← Go back to 
[Inventories Module Documentation](/Inventories)


# Sale_Order_Treasury.aspx

## Overview

**File**: `\Inventories\Process\Sale_Order_Treasury.aspx`
**Purpose**: Sale order treasury page for confirming bank or safe payment for sale requests
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Treasury staff, finance administrators, payment processors

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Sale Order Selection (Required for Loading Details)**
- **Sale Order Dropdown**: Must select valid sale order for loading details
- **Error Prevention**: System validates sale order is selected before loading details
- **Data Source**: Inventories_Sell_HD table with status='fourth' (pending treasury)
- **Default Behavior**: User must select sale order manually
- **Error Message**: Validation prevents detail loading without order selection
- **Validation**: Only orders with status='fourth' (pending treasury) are available

#### 2. **Payment Method Selection (Required for Processing)**
- **Bank Radio Button**: Must select bank for bank payment processing
- **Safe Radio Button**: Must select safe for cash payment processing
- **Error Prevention**: System validates payment method is selected before processing
- **Data Source**: User selection confirmation
- **Default Behavior**: User must select payment method manually
- **Error Message**: Validation prevents processing without payment method selection
- **Validation**: Payment method must be explicitly selected

#### 3. **Sale Order Review (Required for Decision)**
- **Order Details Grid**: Must review all sale items before making decision
- **Error Prevention**: System displays all items for review before confirmation/rejection
- **Data Source**: Inventories_Sell_DTL table with sale information
- **Default Behavior**: User must review items before making decision
- **Error Message**: No validation required as this is review only
- **Validation**: All items displayed for review

#### 4. **Confirmation Action (Required for Confirmation)**
- **Confirm Button**: Must click confirm button to confirm treasury
- **Error Prevention**: System validates confirmation action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click confirm button manually
- **Error Message**: Validation prevents confirmation without user action
- **Validation**: Confirmation action must be explicitly selected

#### 5. **Rejection Reason Selection (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select valid rejection reason for rejection
- **Error Prevention**: System validates rejection reason is selected before rejection
- **Data Source**: Inventories_Reasons table with rejection reasons
- **Default Behavior**: User must select rejection reason manually
- **Error Message**: Validation prevents rejection without rejection reason selection
- **Validation**: Only active rejection reasons with type=16 are available

### Common Error Scenarios and Prevention

#### **Sale Order Selection Errors**
- **Error**: No sale order selected
- **Prevention**: Always select sale order before loading details
- **Error**: Sale order has no items pending treasury
- **Prevention**: Verify sale order has items pending treasury

#### **Payment Method Selection Errors**
- **Error**: No payment method selected
- **Prevention**: Always select payment method before processing
- **Error**: Both bank and safe selected
- **Prevention**: Only one payment method can be selected

#### **Confirmation Errors**
- **Error**: Confirmation fails
- **Prevention**: Ensure sale order is selected before confirmation
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
2. **User must have treasury permissions** via employee group assignments
3. **Sale orders must be pending treasury** in the system
4. **Items must be available** for treasury

#### **Required System State**
- User authentication must be active
- Treasury permissions must be configured
- Sale order data must be current
- Item data must be available

### Success Criteria

#### **For Sale Order Selection**
- ✅ Sale order dropdown populated with pending treasury orders only
- ✅ Order validation ensures proper detail loading
- ✅ Order selection enables detail display

#### **For Payment Method Selection**
- ✅ Bank radio button enables bank payment processing
- ✅ Safe radio button enables cash payment processing
- ✅ Payment method selection enables confirmation workflow

#### **For Order Review**
- ✅ Detail grid displays all items for selected order
- ✅ Item details show complete sale information
- ✅ Review functionality works properly
- ✅ Total calculations are accurate

#### **For Confirmation Management**
- ✅ Confirmation creates proper confirmation records
- ✅ Payment method selection enables confirmation workflow
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
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for sale order treasury

### Sale Order Selection Section

```html
<!-- Sale Order Selection -->
<dx:BootstrapLayoutItem Caption="رقم طلب البيع" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="drp_order" runat="server" AutoPostBack="true" EnableCallbackMode="false" NullText="اختر طلب البيع" ValueField="id" DataSourceID="orders">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id"/>
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Payment Method Selection Section

```html
<!-- Payment Method Selection -->
<dx:BootstrapLayoutItem Caption="بنك" ColSpanMd="2" CssClasses-Caption="rr">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapRadioButton runat="server" Text="" GroupName="RadioGroup" ID="rdp_bank">
            </dx:BootstrapRadioButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="خزينة" ColSpanMd="2" CssClasses-Caption="rr">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapRadioButton runat="server" Text="" GroupName="RadioGroup" ID="rdp_safe">
            </dx:BootstrapRadioButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Sale Details Grid Section

```html
<!-- Sale Details Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grid" runat="server" EnableCallBacks="false" AutoPostBack="true" KeyFieldName="id" CssClasses-Control="cc" OnCustomColumnDisplayText="grid_CustomColumnDisplayText" DataSourceID="details">
                <Columns>
                    <dx:BootstrapGridViewDataColumn Caption="مسلسل" VisibleIndex="0" />
                    <dx:BootstrapGridViewDataColumn FieldName="id" Visible="false" VisibleIndex="1" />
                    <dx:BootstrapGridViewDataColumn FieldName="item_Code" Caption="كود الصنف" VisibleIndex="2" />
                    <dx:BootstrapGridViewDataColumn FieldName="item_Name" Caption="مسمى الصنف" VisibleIndex="3" />
                    <dx:BootstrapGridViewDataColumn FieldName="batch_No" Caption="الدفعة" VisibleIndex="4" Visible="false" />
                    <dx:BootstrapGridViewDataColumn FieldName="inventory_Name" Caption="المخزن" VisibleIndex="5" />
                    <dx:BootstrapGridViewDataColumn FieldName="exp_Date" Caption="تاريخ الصلاحية" VisibleIndex="6" />
                    <dx:BootstrapGridViewDataColumn FieldName="storage_Unit" Caption="وحدة التخزين" VisibleIndex="7" />
                    <dx:BootstrapGridViewDataColumn FieldName="available_amount" Caption="الرصيد" VisibleIndex="8" />
                    <dx:BootstrapGridViewDataColumn FieldName="price_Unit" Caption="سعر الوحدة" VisibleIndex="9" />
                    <dx:BootstrapGridViewDataColumn FieldName="total_PriceAvailableAmount" Caption="اجمالى القيمة" VisibleIndex="10" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplierCode" Caption="كود المورد" VisibleIndex="11" />
                    <dx:BootstrapGridViewDataColumn FieldName="SupplyInvoiceNumber" Caption="رقم فاتورة التوريد" VisibleIndex="12" />
                    <dx:BootstrapGridViewDataColumn FieldName="sellQuantity" Caption="الكمية المباعة" VisibleIndex="13" />
                    <dx:BootstrapGridViewDataColumn FieldName="TotalSellValue" Caption="اجمالى القيمة المباعة" VisibleIndex="14" />
                    <dx:BootstrapGridViewDataColumn FieldName="BuyerCode" Caption="كود المشترى" VisibleIndex="15" />
                    <dx:BootstrapGridViewDataColumn FieldName="BuyerName" Caption="مسمى المشترى" VisibleIndex="16" />
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
<!-- Confirmation and Rejection -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="btn_approve" runat="server" AutoPostBack="true" EnableCallbackMode="false" Text="تأكيد الخزينة" Width="100%" OnClick="btn_approve_Click">
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
- `@Header_FK` - Sale order header ID for filtering details

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Order Selection**: Loads details based on selected sale order
3. **Payment Method Selection**: Selects bank or safe for payment processing
4. **Detail Review**: Displays all sale items for review
5. **Confirmation**: Processes confirmation for selected sale order
6. **Rejection**: Processes rejection for selected sale order with reason

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads sale order information
3. Sets default treasury state
4. Initializes date displays

### btn_approve_Click Method

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
```

**Purpose**: Confirms treasury for selected sale order

**Process**:
1. Validates order selection
2. Validates payment method selection
3. Validates confirmation permissions
4. Updates order status to confirmed
5. Refreshes detail grid
6. Provides success feedback

### btn_reject_Click Method

```csharp
protected void btn_reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected sale order with reason

**Process**:
1. Validates order selection
2. Validates rejection reason selection
3. Updates order status to rejected
4. Refreshes detail grid
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Sell_HD**
- **Purpose**: Sale order header information
- **Key Fields**: id, status
- **Usage**: Tracks sale order information for treasury
- **Filtering**: Only orders with status='fourth' (pending treasury)

#### **Inventories_Sell_DTL**
- **Purpose**: Sale order details with item information
- **Key Fields**: id, Header_FK, item_Code, item_Name, batch_No, inventory_Name, exp_Date, storage_Unit, available_amount, price_Unit, total_PriceAvailableAmount, SupplierCode, SupplyInvoiceNumber, sellQuantity, BuyerCode, BuyerName, StockId, TotalSellValue
- **Usage**: Tracks sale order items for treasury
- **Filtering**: Only items for selected order

#### **Inventories_Reasons**
- **Purpose**: Rejection reason master data
- **Key Fields**: id, reason, active, type
- **Usage**: Provides rejection reasons for rejection
- **Filtering**: Only active reasons with type=16

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing treasury data

#### **Order Filtering**
```sql
SELECT id FROM Inventories_Sell_HD WHERE status='fourth'
```

**Filtering Logic**: Shows only orders pending treasury
**Permission Logic**: Only orders pending treasury are available
**Validation**: Ensures order has items pending treasury

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

#### **1. Sale Order Selection Section**
```html
<!-- Sale Order Selection -->
<dx:BootstrapLayoutItem Caption="رقم طلب البيع" ColSpanMd="4">
```

#### **2. Payment Method Selection Section**
```html
<!-- Payment Method Selection -->
<dx:BootstrapLayoutItem Caption="بنك" ColSpanMd="2" CssClasses-Caption="rr">
<dx:BootstrapLayoutItem Caption="خزينة" ColSpanMd="2" CssClasses-Caption="rr">
```

#### **3. Sale Details Grid Section**
```html
<!-- Sale Details Grid -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
```

#### **4. Confirmation and Rejection Section**
```html
<!-- Confirmation and Rejection -->
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
orders.SelectCommand = "SELECT id FROM Inventories_Sell_HD WHERE status='fourth'";

// Detail Data Source
SqlDataSource details = new SqlDataSource();
details.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details.SelectCommand = "SELECT dt.id, item_Name, item_Code, batch_No, inventory_code, inventory_Name, exp_Date, storage_Unit, available_amount, price_Unit, total_PriceAvailableAmount, SupplierCode, SupplyInvoiceNumber, sellQuantity, BuyerCode, BuyerName, StockId, dt.TotalSellValue FROM Inventories_Sell_DTL dt INNER JOIN Inventories_Sell_HD hd ON hd.id=dt.Header_FK WHERE Header_FK=@Header_FK AND hd.status='fourth'";

// Rejection Reason Data Source
SqlDataSource reasons = new SqlDataSource();
reasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
reasons.SelectCommand = "SELECT id, reason FROM Inventories_Reasons WHERE type=16 AND active=1";
```

## Business Logic and Validation

### Order Selection Validation

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
{
    if (drp_order.Value == "" || drp_order.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طلب البيع');", true);
        return;
    }
    // ... additional validation
}
```

**Order Logic**: Validates order selection before confirmation
**Error Prevention**: Prevents confirmation without order selection

### Payment Method Validation

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
{
    if (!rdp_bank.Checked && !rdp_safe.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طريقة الدفع');", true);
        return;
    }
    // ... additional validation
}
```

**Payment Method Logic**: Validates payment method selection before confirmation
**Error Prevention**: Prevents confirmation without payment method selection

### Confirmation Validation

```csharp
protected void btn_approve_Click(object sender, EventArgs e)
{
    if (drp_order.Value == "" || drp_order.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار طلب البيع');", true);
        return;
    }
    // ... additional validation
}
```

**Confirmation Logic**: Validates order selection before confirmation
**Error Prevention**: Prevents confirmation without order selection

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
- **Order Selection Validation**: Must select order before loading details
- **Payment Method Validation**: Must select payment method before processing
- **Confirmation Validation**: Must select order before confirmation
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Order Validation**: Ensures order is pending treasury
- **Item Validation**: Ensures items are pending treasury
- **Payment Method Validation**: Ensures payment method is selected
- **Rejection Reason Validation**: Ensures rejection reason is active and available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Order Access**: Ensures user has access to selected order
- **Treasury Access**: Ensures user can access and modify treasury records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Confirmation Success**: "تم تأكيد الخزينة" (Treasury confirmed successfully)
- **Rejection Success**: "تم رفض الطلب" (Order rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of detail grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Sale Order Management System**
- **Database Tables**:
  - `Inventories_Sell_HD` - Sale order header information
  - `Inventories_Sell_DTL` - Sale order item details
  - `Inventories_Reasons` - Rejection reason master data
- **Integration Details**:
  - Order selection controls detail display
  - Details displayed with complete information
  - Confirmation/rejection tracked with complete information
- **Data Flow**:
  - Orders filtered for user access
  - Details filtered by order
  - Confirmation/rejection tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all treasury operations
  - Order access controlled by user permissions

### Data Exchange

#### **Order and Item Information**
- **Database Tables**:
  - `Inventories_Sell_HD` - Sale order header information
  - `Inventories_Sell_DTL` - Sale order item details
- **Real-time Data**:
  - Order information for treasury
  - Item quantities and prices
- **Data Relationships**:
  - Orders linked to items via Header_FK
  - Confirmation/rejection tracked by user

#### **Item and Treasury Information**
- **Database Tables**:
  - `Inventories_Sell_DTL` - Sale order item details
  - `Inventories_Reasons` - Rejection reason master data
- **Real-time Data**:
  - Item details and descriptions
  - Treasury quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to treasury via item_Code
  - Treasury tracked by order
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار طلب البيع" Error**
- **Cause**: Order not selected before loading details
- **Solution**: Always select order before loading details
- **Prevention**: Order selection is required for all treasury operations

#### **"الرجاء اختيار طريقة الدفع" Error**
- **Cause**: Payment method not selected before processing
- **Solution**: Always select payment method before processing
- **Prevention**: Payment method selection is required for all treasury operations

#### **"الرجاء اختيار سبب الرفض" Error**
- **Cause**: Rejection reason not selected before rejection
- **Solution**: Always select rejection reason before rejection
- **Prevention**: Rejection reason selection is required for all rejection operations

#### **No Orders Found**
- **Cause**: No orders pending treasury
- **Solution**: Verify orders are pending treasury
- **Prevention**: Ensure orders are pending treasury

#### **Confirmation Failed Error**
- **Cause**: Confirmation cannot be processed
- **Solution**: Verify order is selected before confirmation
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
- **Treasury Access**: Access to treasury operations
- **Order Access**: Access to orders with treasury items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Treasury Workflow**: Understanding of treasury process
- **Order Management**: Knowledge of order selection and treasury
- **Treasury Management**: Familiarity with treasury save and rejection operations

## Usage Examples

### Basic Treasury Workflow

1. **Page Load**: Verify page loads with default data
2. **Order Selection**: Select order for treasury
3. **Payment Method Selection**: Select bank or safe for payment
4. **Detail Review**: Review items in sale details grid
5. **Confirmation**: Click confirm button to process confirmation
6. **Rejection**: Click reject button to process rejection with reason

### Rejection Workflow

1. **Order Selection**: Select order for rejection
2. **Detail Review**: Review items in sale details grid
3. **Rejection Reason Selection**: Select rejection reason
4. **Rejection**: Click reject button to process rejection

### Multi-Order Treasury Management

1. **Order Selection**: Select order for treasury
2. **Payment Method Selection**: Select bank or safe for payment
3. **Detail Review**: Review items for selected order
4. **Confirmation**: Process confirmation for selected order
5. **Rejection**: Process rejection for selected order with reason
6. **Completion**: Complete all treasury operations