← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Year_End_Closing.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Year_End_Closing.aspx`
**Purpose**: Year-end closing system for inventory management
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, financial managers, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Financial Year Display (Read-Only)**
- **Financial Year Field**: Displays current financial year (read-only)
- **Error Prevention**: System automatically loads financial year from system settings
- **Data Source**: System configuration with financial year information
- **Default Behavior**: User cannot modify financial year
- **Error Message**: No validation required as this is read-only
- **Validation**: Financial year is automatically validated by system

#### 2. **Store Selection (Required for Year-End Closing)**
- **Store Dropdown**: Must select valid store for year-end closing
- **Error Prevention**: System validates store is selected before starting procedures
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents year-end closing without store selection
- **Validation**: Only active stores are available

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before starting procedures
- **Error**: Store has no inventory data
- **Prevention**: Verify store has inventory data before selection

#### **Year-End Closing Errors**
- **Error**: Year-end closing fails
- **Prevention**: Ensure store is selected before starting procedures
- **Error**: Store already closed for year-end
- **Prevention**: System checks if store is already closed

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have year-end closing permissions** via employee group assignments
3. **Financial year must be configured** in the system
4. **Stores must be configured** in the system
5. **Inventory data must be available** for year-end closing

#### **Required System State**
- User authentication must be active
- Year-end closing permissions must be configured
- Financial year data must be current
- Store data must be current
- Inventory data must be available

### Success Criteria

#### **For Financial Year Display**
- ✅ Financial year displays correctly
- ✅ Financial year is read-only
- ✅ Financial year validation ensures proper year-end closing

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper year-end closing
- ✅ Store selection enables year-end closing procedures

#### **For Year-End Closing**
- ✅ Year-end closing procedures start properly
- ✅ Year-end closing completes successfully
- ✅ Year-end closing status updates properly

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" Width="100%">
```

**Form Layout**: Bootstrap form layout with vertical structure for year-end closing

### Financial Year Display Section

```html
<!-- Financial Year Display -->
<dx:BootstrapLayoutItem Caption="العام المالي" ColSpanMd="6" CssClasses-Item="d-flex flex-column align-items-start">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="textbox_financial_year" Enabled="false" AutoPostBack="false" CssClasses-Control="mb-2 w-50 align-self-auto" CssClasses-Input="text-center" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Store Selection Section

```html
<!-- Store Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6" CssClasses-Item="d-flex flex-column align-items-start" CssClasses-Control="align-self-auto">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{1}" CssClasses-Control="mb-2" CssClasses-ClearButton="btn btn-primary btn-clear" Style="right: -30px;" OnSelectedIndexChanged="ComboBox_Store_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Start Procedures Button Section

```html
<!-- Start Procedures Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="d-flex justify-content-center">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_StartProcedures" Text="بدء الإجراءات" OnClick="Btn_StartProcedures_Click" Enabled="false" CssClasses-Control="w-15 text-center">
                <SettingsBootstrap RenderOption="Primary" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Store Parameters**:
- `@Store_ID` - Store ID for year-end closing

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Financial Year Display**: Displays current financial year
3. **Store Selection**: Loads stores for selection
4. **Year-End Closing**: Starts year-end closing procedures

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads financial year information
3. Loads store information
4. Sets default year-end closing state

### ComboBox_Store_SelectedIndexChanged Method

```csharp
protected void ComboBox_Store_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Enables start procedures button based on store selection

**Process**:
1. Validates store selection
2. Enables start procedures button
3. Updates store information display

### Btn_StartProcedures_Click Method

```csharp
protected void Btn_StartProcedures_Click(object sender, EventArgs e)
```

**Purpose**: Starts year-end closing procedures

**Process**:
1. Validates store selection
2. Starts year-end closing procedures
3. Updates year-end closing status
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **System Configuration**
- **Purpose**: System configuration with financial year information
- **Key Fields**: Financial_Year, active
- **Usage**: Provides financial year for display
- **Filtering**: Only active financial years

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing year-end closing data

#### **Store Filtering**
```sql
SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store
```

**Filtering Logic**: Shows all stores for user
**Permission Logic**: All stores are available
**Validation**: Ensures store has year-end closing data

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store dropdown

### Button Enable/Disable Logic

```html
Enabled="false"
```

**Button Logic**: Disables button until store is selected
**User Experience**: Prevents year-end closing without store selection
**Usage**: Applied to start procedures button

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with vertical structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Financial Year Display Section**
```html
<!-- Financial Year Display -->
<dx:BootstrapLayoutItem Caption="العام المالي" ColSpanMd="6" CssClasses-Item="d-flex flex-column align-items-start">
```

#### **2. Store Selection Section**
```html
<!-- Store Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6" CssClasses-Item="d-flex flex-column align-items-start" CssClasses-Control="align-self-auto">
```

#### **3. Start Procedures Button Section**
```html
<!-- Start Procedures Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" CssClasses-Control="d-flex justify-content-center">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void ComboBox_Store_SelectedIndexChanged(object sender, EventArgs e)
{
    if (ComboBox_Store.Value == "" || ComboBox_Store.Value == null)
    {
        Btn_StartProcedures.Enabled = false;
        return;
    }
    Btn_StartProcedures.Enabled = true;
    // ... additional validation
}
```

**Store Logic**: Validates store selection before enabling start procedures
**Error Prevention**: Prevents year-end closing without store selection

### Year-End Closing Validation

```csharp
protected void Btn_StartProcedures_Click(object sender, EventArgs e)
{
    if (ComboBox_Store.Value == "" || ComboBox_Store.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Year-End Closing Logic**: Validates store selection before starting procedures
**Error Prevention**: Prevents year-end closing without store selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before starting procedures

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Status updates confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Financial Year Validation**: Ensures financial year is current
- **Year-End Closing Validation**: Ensures year-end closing is not already completed

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Year-End Closing Access**: Ensures user can access and modify year-end closing records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Year-End Closing Success**: "تم اقفال نهاية العام" (Year-end closed successfully)

#### **UI Updates**
- **Button State Updates**: Buttons enable/disable based on selection state
- **Status Updates**: Status updates confirm successful operations
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Year-End Closing Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - System configuration with financial year information
- **Integration Details**:
  - Store selection controls year-end closing
  - Financial year display shows current year
  - Year-end closing procedures executed
- **Data Flow**:
  - Stores filtered for user access
  - Financial year loaded from system configuration
  - Year-end closing procedures executed

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all year-end closing operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Financial Year Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - System configuration with financial year information
- **Real-time Data**:
  - Store information for filtering
  - Financial year information for display
  - Year-end closing status
- **Data Relationships**:
  - Stores linked to year-end closing via Store_ID
  - Financial year linked to year-end closing via system configuration

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before starting procedures
- **Solution**: Always select store before starting procedures
- **Prevention**: Store selection is required for all year-end closing operations

#### **Year-End Closing Failed Error**
- **Cause**: Year-end closing cannot be completed
- **Solution**: Verify store is selected before starting procedures
- **Prevention**: Ensure proper selection before starting procedures

#### **Store Already Closed Error**
- **Cause**: Store already closed for year-end
- **Solution**: Verify store is not already closed
- **Prevention**: System checks if store is already closed

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for button functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Year-End Closing Access**: Access to year-end closing operations
- **Store Access**: Access to stores with year-end closing data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for data loading and retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Year-End Closing Workflow**: Understanding of year-end closing process
- **Store Management**: Knowledge of store selection and filtering
- **Financial Year Management**: Knowledge of financial year display and validation

## Usage Examples

### Basic Year-End Closing Workflow

1. **Page Load**: Verify page loads with default data
2. **Financial Year Review**: Review current financial year
3. **Store Selection**: Select store for year-end closing
4. **Start Procedures**: Start year-end closing procedures
5. **Completion**: Complete year-end closing operations

### Year-End Closing Management Workflow

1. **Store Selection**: Select store for year-end closing management
2. **Financial Year Review**: Review current financial year
3. **Start Procedures**: Start year-end closing procedures
4. **Status Monitoring**: Monitor year-end closing status
5. **Completion**: Complete year-end closing operations

### Multi-Store Year-End Closing Management

1. **Store Selection**: Select store for year-end closing
2. **Financial Year Review**: Review current financial year
3. **Selective Closing**: Close year-end for specific stores as needed
4. **Status Comparison**: Compare year-end closing across stores
5. **Completion**: Complete all year-end closing operations