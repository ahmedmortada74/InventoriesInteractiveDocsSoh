← Go back to 
[Inventories Module Documentation](/Inventories)


# Send_Sms_Test.aspx

## Overview

**File**: `\Inventories\Process\Send_Sms_Test.aspx`
**Purpose**: SMS testing page for sending test SMS messages
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: System administrators, IT support, testing personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Message Input (Required for Sending)**
- **Message Text Field**: Must enter valid message content for SMS
- **Error Prevention**: System validates message is entered before sending
- **Data Source**: User input with text validation
- **Default Behavior**: User must enter message manually
- **Error Message**: Validation prevents sending without message content
- **Validation**: Message must be non-empty

#### 2. **Phone Number Input (Required for Sending)**
- **Phone Number Text Field**: Must enter valid phone number for SMS
- **Error Prevention**: System validates phone number is entered before sending
- **Data Source**: User input with text validation
- **Default Behavior**: User must enter phone number manually
- **Error Message**: Validation prevents sending without phone number
- **Validation**: Phone number must be non-empty

#### 3. **Send Action (Required for Sending)**
- **Send Button**: Must click send button to send SMS
- **Error Prevention**: System validates send action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click send button manually
- **Error Message**: Validation prevents sending without user action
- **Validation**: Send action must be explicitly selected

### Common Error Scenarios and Prevention

#### **Message Input Errors**
- **Error**: No message entered
- **Prevention**: Always enter message before sending
- **Error**: Empty message
- **Prevention**: Always enter non-empty message

#### **Phone Number Input Errors**
- **Error**: No phone number entered
- **Prevention**: Always enter phone number before sending
- **Error**: Invalid phone number format
- **Prevention**: Always enter valid phone number format

#### **Send Action Errors**
- **Error**: Send fails
- **Prevention**: Ensure message and phone number are entered before sending
- **Error**: SMS service unavailable
- **Prevention**: Verify SMS service is available before sending

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have SMS testing permissions** via employee group assignments
3. **SMS service must be configured** in the system
4. **Phone number must be valid** for SMS delivery

#### **Required System State**
- User authentication must be active
- SMS testing permissions must be configured
- SMS service must be available
- Phone number format must be valid

### Success Criteria

#### **For Message Input**
- ✅ Message text field accepts valid text input
- ✅ Message validation ensures proper SMS content
- ✅ Message content is non-empty

#### **For Phone Number Input**
- ✅ Phone number text field accepts valid phone number input
- ✅ Phone number validation ensures proper SMS delivery
- ✅ Phone number format is valid

#### **For Send Management**
- ✅ Send creates proper SMS delivery
- ✅ Message and phone number selection enables send workflow
- ✅ Send workflow works with proper validation
- ✅ Send completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for SMS testing

### Message Input Section

```html
<!-- Message Input -->
<dx:BootstrapLayoutItem Caption="message" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="message_id" runat="server" AutoPostBack="True" EnableCallbackMode="True">
            </dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Phone Number Input Section

```html
<!-- Phone Number Input -->
<dx:BootstrapLayoutItem Caption="phone" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox ID="phone_type" runat="server" AutoPostBack="True" EnableCallbackMode="True">
            </dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Send Button Section

```html
<!-- Send Button -->
<dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn" Width="100%" Text="بحث" OnClick="search_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Message Parameters**:
- `message_id` - Message content for SMS

**Phone Parameters**:
- `phone_type` - Phone number for SMS delivery

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Message Input**: Enters message content for SMS
3. **Phone Number Input**: Enters phone number for SMS delivery
4. **Send**: Sends SMS with message and phone number

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads SMS service information
3. Sets default SMS state
4. Initializes message displays

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Sends SMS with message and phone number

**Process**:
1. Validates message is entered
2. Validates phone number is entered
3. Validates SMS service is available
4. Sends SMS with message and phone number
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **SMS Service Configuration**
- **Purpose**: SMS service configuration
- **Key Fields**: service_url, api_key, active
- **Usage**: Provides SMS service for sending messages
- **Filtering**: Only active SMS services

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing SMS data

#### **SMS Service Filtering**
```sql
SELECT service_url, api_key FROM SMS_Service WHERE active=1
```

**Filtering Logic**: Shows only active SMS services
**Permission Logic**: Only active SMS services are available
**Validation**: Ensures SMS service is available

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when text input changes
**User Experience**: Provides immediate feedback when input changes
**Usage**: Applied to message and phone number text fields

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
**Usage**: Applied to send button to prevent multiple submissions

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
- **Form Layout**: BootstrapFormLayout with vertical structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Message Input Section**
```html
<!-- Message Input -->
<dx:BootstrapLayoutItem Caption="message" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
```

#### **2. Phone Number Input Section**
```html
<!-- Phone Number Input -->
<dx:BootstrapLayoutItem Caption="phone" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
```

#### **3. Send Button Section**
```html
<!-- Send Button -->
<dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// SMS Service Data Source
SqlDataSource smsService = new SqlDataSource();
smsService.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
smsService.SelectCommand = "SELECT service_url, api_key FROM SMS_Service WHERE active=1";
```

## Business Logic and Validation

### Message Input Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (message_id.Text == "" || message_id.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الرسالة');", true);
        return;
    }
    // ... additional validation
}
```

**Message Logic**: Validates message is entered before sending
**Error Prevention**: Prevents sending without message content

### Phone Number Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (phone_type.Text == "" || phone_type.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم الهاتف');", true);
        return;
    }
    // ... additional validation
}
```

**Phone Number Logic**: Validates phone number is entered before sending
**Error Prevention**: Prevents sending without phone number

### Send Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (message_id.Text == "" || message_id.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الرسالة');", true);
        return;
    }
    if (phone_type.Text == "" || phone_type.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم الهاتف');", true);
        return;
    }
    // ... additional validation
}
```

**Send Logic**: Validates message and phone number are entered before sending
**Error Prevention**: Prevents sending without message and phone number

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Message Input Validation**: Must enter message before sending
- **Phone Number Validation**: Must enter phone number before sending
- **Send Validation**: Must enter message and phone number before sending

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: SMS delivery and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Message Validation**: Ensures message is non-empty
- **Phone Number Validation**: Ensures phone number is non-empty
- **SMS Service Validation**: Ensures SMS service is available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **SMS Access**: Ensures user has access to SMS service
- **Send Access**: Ensures user can access and modify SMS records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **SMS Service**: Manages SMS service errors with appropriate user feedback
- **Send Operations**: Handles send failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Send Success**: "تم ارسال الرسالة" (Message sent successfully)

#### **UI Updates**
- **Form Clearing**: Form fields clear after successful operations
- **Button State Updates**: Buttons enable/disable based on input state
- **Success Indicators**: SMS delivery and data display confirm successful operations

## Integration Points

### External Systems

#### **SMS Service Management System**
- **Database Tables**:
  - `SMS_Service` - SMS service configuration
- **Integration Details**:
  - Message input controls SMS content
  - Phone number input controls SMS delivery
  - Send tracked with complete information
- **Data Flow**:
  - Messages filtered for user access
  - Phone numbers filtered by user
  - Send tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all SMS operations
  - SMS access controlled by user permissions

### Data Exchange

#### **Message and Phone Information**
- **Database Tables**:
  - `SMS_Service` - SMS service configuration
- **Real-time Data**:
  - Message content for SMS
  - Phone number for SMS delivery
- **Data Relationships**:
  - Messages linked to SMS via message_id
  - Phone numbers linked to SMS via phone_type
  - Send tracked by user

#### **SMS and Delivery Information**
- **Database Tables**:
  - `SMS_Service` - SMS service configuration
- **Real-time Data**:
  - SMS content and delivery
  - Phone number and delivery status
- **Data Relationships**:
  - SMS linked to delivery via service_url
  - Delivery tracked by user
  - SMS information calculated from service configuration

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء ادخال الرسالة" Error**
- **Cause**: Message not entered before sending
- **Solution**: Always enter message before sending
- **Prevention**: Message entry is required for all SMS operations

#### **"الرجاء ادخال رقم الهاتف" Error**
- **Cause**: Phone number not entered before sending
- **Solution**: Always enter phone number before sending
- **Prevention**: Phone number entry is required for all SMS operations

#### **SMS Service Unavailable Error**
- **Cause**: SMS service is not available
- **Solution**: Verify SMS service is available before sending
- **Prevention**: Ensure SMS service is configured and active

#### **Send Failed Error**
- **Cause**: SMS cannot be sent
- **Solution**: Verify message and phone number are entered before sending
- **Prevention**: Ensure proper validation before sending

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for form functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper form display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **SMS Access**: Access to SMS operations
- **Send Access**: Access to send operations

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **SMS Service**: Stable connection to SMS service
- **Network Speed**: Adequate speed for SMS delivery
- **Firewall**: Access to database servers and SMS service

#### **Training Requirements**
- **SMS Workflow**: Understanding of SMS process
- **Message Management**: Knowledge of message entry and delivery
- **SMS Management**: Familiarity with SMS save and delivery operations

## Usage Examples

### Basic SMS Workflow

1. **Page Load**: Verify page loads with default data
2. **Message Input**: Enter message content for SMS
3. **Phone Number Input**: Enter phone number for SMS delivery
4. **Send**: Click send button to send SMS

### Multi-Message SMS Management

1. **Message Input**: Enter message content for SMS
2. **Phone Number Input**: Enter phone number for SMS delivery
3. **Send**: Send SMS with message and phone number
4. **Repeat**: Send additional SMS messages as needed
5. **Completion**: Complete all SMS operations