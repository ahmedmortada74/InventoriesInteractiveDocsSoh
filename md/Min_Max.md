← Go back to 
[Inventories Module Documentation](/Inventories)


# Min_Max.aspx

## Overview

**File**: `\Inventories\Process\Min_Max.aspx`
**Purpose**: Minimum and maximum inventory limits management system for items
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, procurement personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Item Type Selection (Required for Filtering)**
- **Item Type Dropdown**: Must select valid item type for filtering
- **Error Prevention**: System validates item type is selected before loading data
- **Data Source**: Inventories_item_type table with item type information
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents data loading without item type selection
- **Validation**: Only active item types are available

#### 2. **Vendor Selection (Required for Filtering)**
- **Vendor Dropdown**: Must select valid vendor for filtering
- **Error Prevention**: System validates vendor is selected before loading data
- **Data Source**: Customer_Supplier table with vendor information
- **Default Behavior**: User must select vendor manually
- **Error Message**: Validation prevents data loading without vendor selection
- **Validation**: Only active vendors are available

#### 3. **Minimum Limit Input (Required for Each Item)**
- **Minimum Limit Field**: Must enter valid minimum limit for each item
- **Error Prevention**: System validates minimum limit is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter minimum limit manually for each item
- **Error Message**: Validation prevents saving with zero or negative minimum limit
- **Validation**: Minimum limit must be positive number

#### 4. **Maximum Limit Input (Required for Each Item)**
- **Maximum Limit Field**: Must enter valid maximum limit for each item
- **Error Prevention**: System validates maximum limit is greater than minimum limit
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter maximum limit manually for each item
- **Error Message**: Validation prevents saving with invalid maximum limit
- **Validation**: Maximum limit must be greater than minimum limit

#### 5. **Supply Time Input (Required for Each Item)**
- **Supply Time Field**: Must enter valid supply time for each item
- **Error Prevention**: System validates supply time is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter supply time manually for each item
- **Error Message**: Validation prevents saving with zero or negative supply time
- **Validation**: Supply time must be positive number

#### 6. **Reliance Time Input (Required for Each Item)**
- **Reliance Time Field**: Must enter valid reliance time for each item
- **Error Prevention**: System validates reliance time is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter reliance time manually for each item
- **Error Message**: Validation prevents saving with zero or negative reliance time
- **Validation**: Reliance time must be positive number

### Common Error Scenarios and Prevention

#### **Item Type Selection Errorss**
- **Error**: No item type selected
- **Prevention**: Always select item type before loading data
- **Error**: Invalid item type
- **Prevention**: Verify item type is active and available

#### **Vendor Selection Errors**
- **Error**: No vendor selected
- **Prevention**: Always select vendor before loading data
- **Error**: Invalid vendor
- **Prevention**: Verify vendor is active and available

#### **Minimum Limit Errors**
- **Error**: No minimum limit entered
- **Prevention**: Always enter minimum limit before saving
- **Error**: Zero or negative minimum limit
- **Prevention**: Always enter positive minimum limit values
- **Error**: Minimum limit exceeds maximum limit
- **Prevention**: System validates minimum limit is less than maximum limit

#### **Maximum Limit Errors**
- **Error**: No maximum limit entered
- **Prevention**: Always enter maximum limit before saving
- **Error**: Zero or negative maximum limit
- **Prevention**: Always enter positive maximum limit values
- **Error**: Maximum limit less than minimum limit
- **Prevention**: System validates maximum limit is greater than minimum limit

#### **Supply Time Errors**
- **Error**: No supply time entered
- **Prevention**: Always enter supply time before saving
- **Error**: Zero or negative supply time
- **Prevention**: Always enter positive supply time values

#### **Reliance Time Errors**
- **Error**: No reliance time entered
- **Prevention**: Always enter reliance time before saving
- **Error**: Zero or negative reliance time
- **Prevention**: Always enter positive reliance time values

#### **Data Management Errors**
- **Error**: Data save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Data update fails
- **Prevention**: Ensure data is selected for update

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have min/max management permissions** via employee group assignments
3. **Item types must be configured** in the system
4. **Vendors must be configured** in the system
5. **Items must be available** for min/max setting

#### **Required System State**
- User authentication must be active
- Min/max management permissions must be configured
- Item type data must be current
- Vendor data must be current
- Item data must be available

### Success Criteria

#### **For Item Type Selection**
- ✅ Item type dropdown populated with active item types only
- ✅ Item type validation ensures proper data loading
- ✅ Item type selection enables data filtering

#### **For Vendor Selection**
- ✅ Vendor dropdown populated with active vendors only
- ✅ Vendor validation ensures proper data loading
- ✅ Vendor selection enables data filtering

#### **For Minimum Limit Input**
- ✅ Minimum limit field accepts valid numeric input
- ✅ Minimum limit validation ensures proper data saving
- ✅ Minimum limit values are positive and reasonable

#### **For Maximum Limit Input**
- ✅ Maximum limit field accepts valid numeric input
- ✅ Maximum limit validation ensures proper data saving
- ✅ Maximum limit values are greater than minimum limit

#### **For Supply Time Input**
- ✅ Supply time field accepts valid numeric input
- ✅ Supply time validation ensures proper data saving
- ✅ Supply time values are positive and reasonable

#### **For Reliance Time Input**
- ✅ Reliance time field accepts valid numeric input
- ✅ Reliance time validation ensures proper data saving
- ✅ Reliance time values are positive and reasonable

#### **For Data Management**
- ✅ Data save creates proper min/max records
- ✅ Data update updates min/max information
- ✅ Data confirmation provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" dir="rtl" LayoutType="Horizontal">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for min/max management

### Item Type and Vendor Selection Section

```html
<!-- Item Type and Vendor Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
            <Items>
                <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="5" CssClasses-Caption="cap">
                    <ContentCollection>
                        <dx:ContentControl>
                            <dx:BootstrapComboBox ID="txtitem" runat="server" AutoPostBack="true" DataSourceID="items" TextField="english_name" ValueField="item_code">
                                <Fields>
                                    <dx:BootstrapListBoxField FieldName="english_name" />
                                    <dx:BootstrapListBoxField FieldName="item_code" />
                                </Fields>
                            </dx:BootstrapComboBox>
                        </dx:ContentControl>
                    </ContentCollection>
                </dx:BootstrapLayoutItem>
                <dx:BootstrapLayoutItem Caption="المورد" ColSpanMd="5" BeginRow="true" CssClasses-Caption="cap">
                    <ContentCollection>
                        <dx:ContentControl>
                            <dx:BootstrapComboBox ID="txtvendor" runat="server" AutoPostBack="true" DataSourceID="suppliers" TextField="FullName" ValueField="id">
                                <Fields>
                                    <dx:BootstrapListBoxField FieldName="FullName" />
                                    <dx:BootstrapListBoxField FieldName="id" />
                                </Fields>
                            </dx:BootstrapComboBox>
                        </dx:ContentControl>
                    </ContentCollection>
                </dx:BootstrapLayoutItem>
                <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2">
                    <ContentCollection>
                        <dx:ContentControl>
                            <dx:BootstrapButton runat="server" ID="btnsearch" Text="بحث" OnClick="btnsearch_Click">
                                <CssClasses Icon="simple-icon-refresh" />
                                <SettingsBootstrap Sizing="Large" />
                                <SettingsBootstrap RenderOption="Info" />
                            </dx:BootstrapButton>
                        </dx:ContentControl>
                    </ContentCollection>
                </dx:BootstrapLayoutItem>
            </Items>
        </dx:BootstrapLayoutGroup>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Data Grid Section

```html
<!-- Data Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView AutoPostBack="true" ID="grid1" runat="server" KeyFieldName="id" EnableCallBacks="false" CssClasses-Table="">
                        <SettingsEditing Mode="Batch"></SettingsEditing>
                        <SettingsDataSecurity AllowEdit="true" AllowDelete="false" AllowInsert="false" />
                        <Columns>
                            <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="id" Caption="" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="item_code" Caption="الكود" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="arabic_name" Caption="المسمى" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="min_limit" Caption="الحد الادنى بالاشهر" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="max_limit" Caption="الحد الاقصى بالاشهر" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="supply_time" Caption="الوقت المتوقع للتوريد بالايام" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="rely_time" Caption="وقت الطلب والاعتماد بالايام" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        </Columns>
                        <SettingsPager PageSize="10">
                            <PageSizeItemSettings Visible="true" Items="10, 20, 50" />
                        </SettingsPager>
                        <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Confirm Button Section

```html
<!-- Confirm Button -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton runat="server" ID="btnsure" Text="تأكيد المدخلات" OnClick="btnsure_Click">
                        <CssClasses Icon="simple-icon-envelope" />
                        <SettingsBootstrap Sizing="Large" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@User_ID` - User ID for filtering temporary records

**Item Type Parameters**:
- `@item_type` - Item type for filtering items

**Vendor Parameters**:
- `@supplier` - Vendor for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Item Type Selection**: Loads items based on selected item type
3. **Vendor Selection**: Filters items based on selected vendor
4. **Data Search**: Searches for items based on filters
5. **Data Display**: Displays items with min/max limits
6. **Data Entry**: Allows user to enter min/max limits
7. **Data Save**: Saves min/max limits for items
8. **Data Confirmation**: Confirms min/max limits for items

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads item type information
3. Loads vendor information
4. Sets default min/max state

### btnsearch_Click Method

```csharp
protected void btnsearch_Click(object sender, EventArgs e)
```

**Purpose**: Searches for items based on selected filters

**Process**:
1. Validates item type selection
2. Validates vendor selection
3. Executes search query
4. Displays results in grid
5. Updates min/max information

### btnsure_Click Method

```csharp
protected void btnsure_Click(object sender, EventArgs e)
```

**Purpose**: Confirms min/max limits for items

**Process**:
1. Validates all items have min/max limits
2. Validates min/max limits are valid
3. Confirms min/max limits
4. Updates min/max status
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: item_code, english_name, item_level, active
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types with item_level=1

#### **Customer_Supplier**
- **Purpose**: Vendor master data
- **Key Fields**: id, FullName, active
- **Usage**: Provides vendor list for filtering
- **Filtering**: Only active vendors

#### **inventories_Min_Max_Temp**
- **Purpose**: Temporary min/max records before confirmation
- **Key Fields**: id, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time, User_ID
- **Usage**: Tracks min/max items before confirmation
- **Filtering**: Only items associated with selected user

#### **inventories_Min_Max_Header**
- **Purpose**: Min/max header information
- **Key Fields**: id, supplier, item_type, User_ID
- **Usage**: Tracks min/max information
- **Filtering**: Only min/max for selected vendor and item type

#### **inventories_Min_Max_details**
- **Purpose**: Min/max details with item information
- **Key Fields**: id, Fk_Header, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time, User_ID
- **Usage**: Tracks min/max items for items
- **Filtering**: Only items for selected header

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing min/max data

#### **Item Type Filtering**
```sql
select item_code, english_name from Inventories_item_type where item_level=1
```

**Filtering Logic**: Shows all active item types with item_level=1
**Permission Logic**: All active item types are available
**Validation**: Ensures item type is active

#### **Vendor Filtering**
```sql
select id, FullName from [Orman].[dbo].[Customer_Supplier]
```

**Filtering Logic**: Shows all active vendors
**Permission Logic**: All active vendors are available
**Validation**: Ensures vendor is active

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to item type and vendor dropdowns

### Grid Batch Editing

```html
SettingsEditing Mode="Batch"
```

**Grid Features**: Batch editing for min/max limits
**User Experience**: Allows editing multiple items at once
**Usage**: Applied to min/max items grid

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectSingleRowOnly="true"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Single row selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to min/max items grid

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Item Type and Vendor Selection Section**
```html
<!-- Item Type and Vendor Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
            <Items>
                <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="5" CssClasses-Caption="cap">
                <dx:BootstrapLayoutItem Caption="المورد" ColSpanMd="5" BeginRow="true" CssClasses-Caption="cap">
                <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2">
            </Items>
        </dx:BootstrapLayoutGroup>
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Data Grid Section**
```html
<!-- Data Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="grid1" runat="server">
```

#### **3. Confirm Button Section**
```html
<!-- Confirm Button -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="btnsure" runat="server">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Item Type Data Source
SqlDataSource items = new SqlDataSource();
items.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
items.SelectCommand = "select item_code, english_name from Inventories_item_type where item_level=1";

// Vendor Data Source
SqlDataSource suppliers = new SqlDataSource();
suppliers.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
suppliers.SelectCommand = "select id, FullName from [Orman].[dbo].[Customer_Supplier]";

// Temporary Min/Max Data Source
SqlDataSource details1 = new SqlDataSource();
details1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details1.SelectCommand = "select id, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time from inventories_Min_Max_Temp WHERE User_ID=@User_ID";
details1.UpdateCommand = "UPDATE inventories_Min_Max_Temp SET min_limit = @min_limit, max_limit = @max_limit, supply_time = @supply_time, rely_time = @rely_time WHERE id=@ID";

// Min/Max Details Data Source
SqlDataSource details2 = new SqlDataSource();
details2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details2.SelectCommand = "select d.id, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time from inventories_Min_Max_details d inner join inventories_Min_Max_Header h on d.Fk_Header=h.id where supplier=@supplier and item_type=@item_type and User_ID=@User_ID";
details2.UpdateCommand = "UPDATE inventories_Min_Max_details SET min_limit = @min_limit, max_limit = @max_limit, supply_time = @supply_time, rely_time = @rely_time WHERE id=@ID";
```

## Business Logic and Validation

### Item Type Selection Validation

```csharp
protected void btnsearch_Click(object sender, EventArgs e)
{
    if (txtitem.Value == "" || txtitem.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Type Logic**: Validates item type selection before loading data
**Error Prevention**: Prevents data loading without item type selection

### Vendor Selection Validation

```csharp
protected void btnsearch_Click(object sender, EventArgs e)
{
    if (txtvendor.Value == "" || txtvendor.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المورد');", true);
        return;
    }
    // ... additional validation
}
```

**Vendor Logic**: Validates vendor selection before loading data
**Error Prevention**: Prevents data loading without vendor selection

### Minimum Limit Validation

```csharp
protected void grid1_RowValidating(object sender, DevExpress.Web.Data.BootstrapGridViewRowValidationEventArgs e)
{
    // Validate minimum limit is positive
    if (Convert.ToDecimal(e.NewValues["min_limit"]) <= 0)
    {
        e.Errors["min_limit"] = "الحد الادنى يجب أن يكون أكبر من صفر";
    }
    // ... additional validation
}
```

**Minimum Limit Logic**: Validates minimum limit is positive and within limits
**Error Prevention**: Prevents saving with invalid minimum limit

### Maximum Limit Validation

```csharp
protected void grid1_RowValidating(object sender, DevExpress.Web.Data.BootstrapGridViewRowValidationEventArgs e)
{
    // Validate maximum limit is greater than minimum limit
    if (Convert.ToDecimal(e.NewValues["max_limit"]) <= Convert.ToDecimal(e.NewValues["min_limit"]))
    {
        e.Errors["max_limit"] = "الحد الاقصى يجب أن يكون أكبر من الحد الادنى";
    }
    // ... additional validation
}
```

**Maximum Limit Logic**: Validates maximum limit is greater than minimum limit
**Error Prevention**: Prevents saving with invalid maximum limit

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Item Type Selection Validation**: Must select item type before loading data
- **Vendor Selection Validation**: Must select vendor before loading data
- **Minimum Limit Validation**: Must enter minimum limit before saving
- **Maximum Limit Validation**: Must enter maximum limit before saving
- **Supply Time Validation**: Must enter supply time before saving
- **Reliance Time Validation**: Must enter reliance time before saving

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Item Type Validation**: Ensures item type is active and available
- **Vendor Validation**: Ensures vendor is active and available
- **Minimum Limit Validation**: Ensures minimum limit is positive and within limits
- **Maximum Limit Validation**: Ensures maximum limit is greater than minimum limit
- **Supply Time Validation**: Ensures supply time is positive and within limits
- **Reliance Time Validation**: Ensures reliance time is positive and within limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Item Type Access**: Ensures user has access to selected item type
- **Vendor Access**: Ensures user has access to selected vendor
- **Min/Max Access**: Ensures user can access and modify min/max records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: "تم البحث بنجاح" (Search completed successfully)
- **Save Success**: "تم حفظ البيانات" (Data saved successfully)
- **Confirmation Success**: "تم تأكيد المدخلات" (Inputs confirmed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of min/max grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Min/Max Management System**
- **Database Tables**:
  - `Inventories_item_type` - Item type master data
  - `Customer_Supplier` - Vendor master data
  - `inventories_Min_Max_Temp` - Temporary min/max records
  - `inventories_Min_Max_Header` - Min/max header information
  - `inventories_Min_Max_details` - Min/max details with item information
- **Integration Details**:
  - Item type selection controls data filtering
  - Vendor selection controls data filtering
  - Min/max limits tracked for each item
  - Supply time and reliance time tracked for each item
- **Data Flow**:
  - Items filtered by item type and vendor
  - Min/max limits entered for each item
  - Data saved and confirmed

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all min/max operations
  - Item type access controlled by user permissions
  - Vendor access controlled by user permissions

### Data Exchange

#### **Item Type and Vendor Information**
- **Database Tables**:
  - `Inventories_item_type` - Item type master data
  - `Customer_Supplier` - Vendor master data
- **Real-time Data**:
  - Item type information for filtering
  - Vendor information for filtering
  - Min/max limits and times
- **Data Relationships**:
  - Item types linked to items via item_code
  - Vendors linked to min/max via supplier
  - Items linked to min/max via item_code

#### **Min/Max and Item Information**
- **Database Tables**:
  - `inventories_Min_Max_Temp` - Temporary min/max records
  - `inventories_Min_Max_Header` - Min/max header information
  - `inventories_Min_Max_details` - Min/max details with item information
- **Real-time Data**:
  - Min/max limits and times
  - Item information and descriptions
  - Supply time and reliance time
- **Data Relationships**:
  - Items linked to min/max via item_code
  - Min/max limits tracked for each item
  - Supply time and reliance time tracked for each item

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع الصنف" Error**
- **Cause**: Item type not selected before loading data
- **Solution**: Always select item type before loading data
- **Prevention**: Item type selection is required for all operations

#### **"الرجاء اختيار المورد" Error**
- **Cause**: Vendor not selected before loading data
- **Solution**: Always select vendor before loading data
- **Prevention**: Vendor selection is required for all operations

#### **"الحد الادنى يجب أن يكون أكبر من صفر" Error**
- **Cause**: Minimum limit not positive
- **Solution**: Always enter positive minimum limit values
- **Prevention**: Minimum limit validation is required for all operations

#### **"الحد الاقصى يجب أن يكون أكبر من الحد الادنى" Error**
- **Cause**: Maximum limit not greater than minimum limit
- **Solution**: Always enter maximum limit greater than minimum limit
- **Prevention**: Maximum limit validation is required for all operations

#### **No Data Found**
- **Cause**: Filters are too restrictive
- **Solution**: Adjust filters to find data
- **Prevention**: Ensure filters are properly set

#### **Data Save Failed Error**
- **Cause**: Data cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

#### **Data Confirmation Failed Error**
- **Cause**: Data cannot be confirmed
- **Solution**: Verify all items have valid min/max limits
- **Prevention**: Ensure proper validation before confirmation

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Min/Max Access**: Access to min/max management operations
- **Item Type Access**: Access to item types with min/max data
- **Vendor Access**: Access to vendors with min/max data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Min/Max Workflow**: Understanding of min/max management process
- **Item Type Management**: Knowledge of item type selection and filtering
- **Vendor Management**: Knowledge of vendor selection and filtering
- **Min/Max Management**: Familiarity with min/max limits and times

## Usage Examples

### Basic Min/Max Management Workflow

1. **Page Load**: Verify page loads with default data
2. **Item Type Selection**: Select item type for filtering
3. **Vendor Selection**: Select vendor for filtering
4. **Data Search**: Search for items based on filters
5. **Data Review**: Review items in grid
6. **Min/Max Entry**: Enter min/max limits for each item
7. **Supply Time Entry**: Enter supply time for each item
8. **Reliance Time Entry**: Enter reliance time for each item
9. **Data Save**: Save min/max limits for items
10. **Data Confirmation**: Confirm min/max limits for items

### Min/Max Limits Management Workflow

1. **Item Type Selection**: Select item type for filtering
2. **Vendor Selection**: Select vendor for filtering
3. **Data Search**: Search for items based on filters
4. **Data Review**: Review items with min/max limits
5. **Min/Max Update**: Update min/max limits as needed
6. **Supply Time Update**: Update supply time as needed
7. **Reliance Time Update**: Update reliance time as needed
8. **Data Save**: Save updated min/max limits
9. **Data Confirmation**: Confirm updated min/max limits

### Multi-Item Min/Max Management

1. **Item Type Selection**: Select item type for filtering
2. **Vendor Selection**: Select vendor for filtering
3. **Data Search**: Search for items based on filters
4. **Multiple Item Selection**: Select multiple items for min/max setting
5. **Min/Max Entry**: Enter min/max limits for each item
6. **Supply Time Entry**: Enter supply time for each item
7. **Reliance Time Entry**: Enter reliance time for each item
8. **Data Save**: Save min/max limits for all items
9. **Data Confirmation**: Confirm min/max limits for all items

## Conclusion

The Min_Max.aspx page provides comprehensive minimum and maximum inventory limits management system for items. The system supports complete min/max workflow including item type selection, vendor selection, data search, min/max entry, supply time entry, reliance time entry, data save, and data confirmation. The page ensures proper item type context, vendor # Min_Max.aspx

## Overview

**File**: `\module\Inventories\Process\Min_Max.aspx`
**Purpose**: Minimum and maximum inventory limits management system for items
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, procurement personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Item Type Selection (Required for Filtering)**
- **Item Type Dropdown**: Must select valid item type for filtering
- **Error Prevention**: System validates item type is selected before loading data
- **Data Source**: Inventories_item_type table with item type information
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents data loading without item type selection
- **Validation**: Only active item types are available

#### 2. **Vendor Selection (Required for Filtering)**
- **Vendor Dropdown**: Must select valid vendor for filtering
- **Error Prevention**: System validates vendor is selected before loading data
- **Data Source**: Customer_Supplier table with vendor information
- **Default Behavior**: User must select vendor manually
- **Error Message**: Validation prevents data loading without vendor selection
- **Validation**: Only active vendors are available

#### 3. **Minimum Limit Input (Required for Each Item)**
- **Minimum Limit Field**: Must enter valid minimum limit for each item
- **Error Prevention**: System validates minimum limit is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter minimum limit manually for each item
- **Error Message**: Validation prevents saving with zero or negative minimum limit
- **Validation**: Minimum limit must be positive number

#### 4. **Maximum Limit Input (Required for Each Item)**
- **Maximum Limit Field**: Must enter valid maximum limit for each item
- **Error Prevention**: System validates maximum limit is greater than minimum limit
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter maximum limit manually for each item
- **Error Message**: Validation prevents saving with invalid maximum limit
- **Validation**: Maximum limit must be greater than minimum limit

#### 5. **Supply Time Input (Required for Each Item)**
- **Supply Time Field**: Must enter valid supply time for each item
- **Error Prevention**: System validates supply time is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter supply time manually for each item
- **Error Message**: Validation prevents saving with zero or negative supply time
- **Validation**: Supply time must be positive number

#### 6. **Reliance Time Input (Required for Each Item)**
- **Reliance Time Field**: Must enter valid reliance time for each item
- **Error Prevention**: System validates reliance time is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter reliance time manually for each item
- **Error Message**: Validation prevents saving with zero or negative reliance time
- **Validation**: Reliance time must be positive number

### Common Error Scenarios and Prevention

#### **Item Type Selection Errorss**
- **Error**: No item type selected
- **Prevention**: Always select item type before loading data
- **Error**: Invalid item type
- **Prevention**: Verify item type is active and available

#### **Vendor Selection Errors**
- **Error**: No vendor selected
- **Prevention**: Always select vendor before loading data
- **Error**: Invalid vendor
- **Prevention**: Verify vendor is active and available

#### **Minimum Limit Errors**
- **Error**: No minimum limit entered
- **Prevention**: Always enter minimum limit before saving
- **Error**: Zero or negative minimum limit
- **Prevention**: Always enter positive minimum limit values
- **Error**: Minimum limit exceeds maximum limit
- **Prevention**: System validates minimum limit is less than maximum limit

#### **Maximum Limit Errors**
- **Error**: No maximum limit entered
- **Prevention**: Always enter maximum limit before saving
- **Error**: Zero or negative maximum limit
- **Prevention**: Always enter positive maximum limit values
- **Error**: Maximum limit less than minimum limit
- **Prevention**: System validates maximum limit is greater than minimum limit

#### **Supply Time Errors**
- **Error**: No supply time entered
- **Prevention**: Always enter supply time before saving
- **Error**: Zero or negative supply time
- **Prevention**: Always enter positive supply time values

#### **Reliance Time Errors**
- **Error**: No reliance time entered
- **Prevention**: Always enter reliance time before saving
- **Error**: Zero or negative reliance time
- **Prevention**: Always enter positive reliance time values

#### **Data Management Errors**
- **Error**: Data save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Data update fails
- **Prevention**: Ensure data is selected for update

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have min/max management permissions** via employee group assignments
3. **Item types must be configured** in the system
4. **Vendors must be configured** in the system
5. **Items must be available** for min/max setting

#### **Required System State**
- User authentication must be active
- Min/max management permissions must be configured
- Item type data must be current
- Vendor data must be current
- Item data must be available

### Success Criteria

#### **For Item Type Selection**
- ✅ Item type dropdown populated with active item types only
- ✅ Item type validation ensures proper data loading
- ✅ Item type selection enables data filtering

#### **For Vendor Selection**
- ✅ Vendor dropdown populated with active vendors only
- ✅ Vendor validation ensures proper data loading
- ✅ Vendor selection enables data filtering

#### **For Minimum Limit Input**
- ✅ Minimum limit field accepts valid numeric input
- ✅ Minimum limit validation ensures proper data saving
- ✅ Minimum limit values are positive and reasonable

#### **For Maximum Limit Input**
- ✅ Maximum limit field accepts valid numeric input
- ✅ Maximum limit validation ensures proper data saving
- ✅ Maximum limit values are greater than minimum limit

#### **For Supply Time Input**
- ✅ Supply time field accepts valid numeric input
- ✅ Supply time validation ensures proper data saving
- ✅ Supply time values are positive and reasonable

#### **For Reliance Time Input**
- ✅ Reliance time field accepts valid numeric input
- ✅ Reliance time validation ensures proper data saving
- ✅ Reliance time values are positive and reasonable

#### **For Data Management**
- ✅ Data save creates proper min/max records
- ✅ Data update updates min/max information
- ✅ Data confirmation provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" dir="rtl" LayoutType="Horizontal">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for min/max management

### Item Type and Vendor Selection Section

```html
<!-- Item Type and Vendor Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
            <Items>
                <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="5" CssClasses-Caption="cap">
                    <ContentCollection>
                        <dx:ContentControl>
                            <dx:BootstrapComboBox ID="txtitem" runat="server" AutoPostBack="true" DataSourceID="items" TextField="english_name" ValueField="item_code">
                                <Fields>
                                    <dx:BootstrapListBoxField FieldName="english_name" />
                                    <dx:BootstrapListBoxField FieldName="item_code" />
                                </Fields>
                            </dx:BootstrapComboBox>
                        </dx:ContentControl>
                    </ContentCollection>
                </dx:BootstrapLayoutItem>
                <dx:BootstrapLayoutItem Caption="المورد" ColSpanMd="5" BeginRow="true" CssClasses-Caption="cap">
                    <ContentCollection>
                        <dx:ContentControl>
                            <dx:BootstrapComboBox ID="txtvendor" runat="server" AutoPostBack="true" DataSourceID="suppliers" TextField="FullName" ValueField="id">
                                <Fields>
                                    <dx:BootstrapListBoxField FieldName="FullName" />
                                    <dx:BootstrapListBoxField FieldName="id" />
                                </Fields>
                            </dx:BootstrapComboBox>
                        </dx:ContentControl>
                    </ContentCollection>
                </dx:BootstrapLayoutItem>
                <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2">
                    <ContentCollection>
                        <dx:ContentControl>
                            <dx:BootstrapButton runat="server" ID="btnsearch" Text="بحث" OnClick="btnsearch_Click">
                                <CssClasses Icon="simple-icon-refresh" />
                                <SettingsBootstrap Sizing="Large" />
                                <SettingsBootstrap RenderOption="Info" />
                            </dx:BootstrapButton>
                        </dx:ContentControl>
                    </ContentCollection>
                </dx:BootstrapLayoutItem>
            </Items>
        </dx:BootstrapLayoutGroup>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Data Grid Section

```html
<!-- Data Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView AutoPostBack="true" ID="grid1" runat="server" KeyFieldName="id" EnableCallBacks="false" CssClasses-Table="">
                        <SettingsEditing Mode="Batch"></SettingsEditing>
                        <SettingsDataSecurity AllowEdit="true" AllowDelete="false" AllowInsert="false" />
                        <Columns>
                            <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="id" Caption="" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="item_code" Caption="الكود" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="arabic_name" Caption="المسمى" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="min_limit" Caption="الحد الادنى بالاشهر" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="max_limit" Caption="الحد الاقصى بالاشهر" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="supply_time" Caption="الوقت المتوقع للتوريد بالايام" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="rely_time" Caption="وقت الطلب والاعتماد بالايام" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        </Columns>
                        <SettingsPager PageSize="10">
                            <PageSizeItemSettings Visible="true" Items="10, 20, 50" />
                        </SettingsPager>
                        <SettingsBehavior AllowSelectSingleRowOnly="true" ProcessFocusedRowChangedOnServer="true" ProcessSelectionChangedOnServer="true" />
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Confirm Button Section

```html
<!-- Confirm Button -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton runat="server" ID="btnsure" Text="تأكيد المدخلات" OnClick="btnsure_Click">
                        <CssClasses Icon="simple-icon-envelope" />
                        <SettingsBootstrap Sizing="Large" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**User Context Parameters**:
- `@User_ID` - User ID for filtering temporary records

**Item Type Parameters**:
- `@item_type` - Item type for filtering items

**Vendor Parameters**:
- `@supplier` - Vendor for filtering items

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Item Type Selection**: Loads items based on selected item type
3. **Vendor Selection**: Filters items based on selected vendor
4. **Data Search**: Searches for items based on filters
5. **Data Display**: Displays items with min/max limits
6. **Data Entry**: Allows user to enter min/max limits
7. **Data Save**: Saves min/max limits for items
8. **Data Confirmation**: Confirms min/max limits for items

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads item type information
3. Loads vendor information
4. Sets default min/max state

### btnsearch_Click Method

```csharp
protected void btnsearch_Click(object sender, EventArgs e)
```

**Purpose**: Searches for items based on selected filters

**Process**:
1. Validates item type selection
2. Validates vendor selection
3. Executes search query
4. Displays results in grid
5. Updates min/max information

### btnsure_Click Method

```csharp
protected void btnsure_Click(object sender, EventArgs e)
```

**Purpose**: Confirms min/max limits for items

**Process**:
1. Validates all items have min/max limits
2. Validates min/max limits are valid
3. Confirms min/max limits
4. Updates min/max status
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: item_code, english_name, item_level, active
- **Usage**: Provides item type list for filtering
- **Filtering**: Only active item types with item_level=1

#### **Customer_Supplier**
- **Purpose**: Vendor master data
- **Key Fields**: id, FullName, active
- **Usage**: Provides vendor list for filtering
- **Filtering**: Only active vendors

#### **inventories_Min_Max_Temp**
- **Purpose**: Temporary min/max records before confirmation
- **Key Fields**: id, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time, User_ID
- **Usage**: Tracks min/max items before confirmation
- **Filtering**: Only items associated with selected user

#### **inventories_Min_Max_Header**
- **Purpose**: Min/max header information
- **Key Fields**: id, supplier, item_type, User_ID
- **Usage**: Tracks min/max information
- **Filtering**: Only min/max for selected vendor and item type

#### **inventories_Min_Max_details**
- **Purpose**: Min/max details with item information
- **Key Fields**: id, Fk_Header, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time, User_ID
- **Usage**: Tracks min/max items for items
- **Filtering**: Only items for selected header

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing min/max data

#### **Item Type Filtering**
```sql
select item_code, english_name from Inventories_item_type where item_level=1
```

**Filtering Logic**: Shows all active item types with item_level=1
**Permission Logic**: All active item types are available
**Validation**: Ensures item type is active

#### **Vendor Filtering**
```sql
select id, FullName from [Orman].[dbo].[Customer_Supplier]
```

**Filtering Logic**: Shows all active vendors
**Permission Logic**: All active vendors are available
**Validation**: Ensures vendor is active

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to item type and vendor dropdowns

### Grid Batch Editing

```html
SettingsEditing Mode="Batch"
```

**Grid Features**: Batch editing for min/max limits
**User Experience**: Allows editing multiple items at once
**Usage**: Applied to min/max items grid

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectSingleRowOnly="true"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Single row selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to min/max items grid

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Item Type and Vendor Selection Section**
```html
<!-- Item Type and Vendor Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
            <Items>
                <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="5" CssClasses-Caption="cap">
                <dx:BootstrapLayoutItem Caption="المورد" ColSpanMd="5" BeginRow="true" CssClasses-Caption="cap">
                <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2">
            </Items>
        </dx:BootstrapLayoutGroup>
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Data Grid Section**
```html
<!-- Data Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="grid1" runat="server">
```

#### **3. Confirm Button Section**
```html
<!-- Confirm Button -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="btnsure" runat="server">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Item Type Data Source
SqlDataSource items = new SqlDataSource();
items.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
items.SelectCommand = "select item_code, english_name from Inventories_item_type where item_level=1";

// Vendor Data Source
SqlDataSource suppliers = new SqlDataSource();
suppliers.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
suppliers.SelectCommand = "select id, FullName from [Orman].[dbo].[Customer_Supplier]";

// Temporary Min/Max Data Source
SqlDataSource details1 = new SqlDataSource();
details1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details1.SelectCommand = "select id, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time from inventories_Min_Max_Temp WHERE User_ID=@User_ID";
details1.UpdateCommand = "UPDATE inventories_Min_Max_Temp SET min_limit = @min_limit, max_limit = @max_limit, supply_time = @supply_time, rely_time = @rely_time WHERE id=@ID";

// Min/Max Details Data Source
SqlDataSource details2 = new SqlDataSource();
details2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
details2.SelectCommand = "select d.id, item_code, arabic_name, min_limit, max_limit, supply_time, rely_time from inventories_Min_Max_details d inner join inventories_Min_Max_Header h on d.Fk_Header=h.id where supplier=@supplier and item_type=@item_type and User_ID=@User_ID";
details2.UpdateCommand = "UPDATE inventories_Min_Max_details SET min_limit = @min_limit, max_limit = @max_limit, supply_time = @supply_time, rely_time = @rely_time WHERE id=@ID";
```

## Business Logic and Validation

### Item Type Selection Validation

```csharp
protected void btnsearch_Click(object sender, EventArgs e)
{
    if (txtitem.Value == "" || txtitem.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Type Logic**: Validates item type selection before loading data
**Error Prevention**: Prevents data loading without item type selection

### Vendor Selection Validation

```csharp
protected void btnsearch_Click(object sender, EventArgs e)
{
    if (txtvendor.Value == "" || txtvendor.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المورد');", true);
        return;
    }
    // ... additional validation
}
```

**Vendor Logic**: Validates vendor selection before loading data
**Error Prevention**: Prevents data loading without vendor selection

### Minimum Limit Validation

```csharp
protected void grid1_RowValidating(object sender, DevExpress.Web.Data.BootstrapGridViewRowValidationEventArgs e)
{
    // Validate minimum limit is positive
    if (Convert.ToDecimal(e.NewValues["min_limit"]) <= 0)
    {
        e.Errors["min_limit"] = "الحد الادنى يجب أن يكون أكبر من صفر";
    }
    // ... additional validation
}
```

**Minimum Limit Logic**: Validates minimum limit is positive and within limits
**Error Prevention**: Prevents saving with invalid minimum limit

### Maximum Limit Validation

```csharp
protected void grid1_RowValidating(object sender, DevExpress.Web.Data.BootstrapGridViewRowValidationEventArgs e)
{
    // Validate maximum limit is greater than minimum limit
    if (Convert.ToDecimal(e.NewValues["max_limit"]) <= Convert.ToDecimal(e.NewValues["min_limit"]))
    {
        e.Errors["max_limit"] = "الحد الاقصى يجب أن يكون أكبر من الحد الادنى";
    }
    // ... additional validation
}
```

**Maximum Limit Logic**: Validates maximum limit is greater than minimum limit
**Error Prevention**: Prevents saving with invalid maximum limit

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Item Type Selection Validation**: Must select item type before loading data
- **Vendor Selection Validation**: Must select vendor before loading data
- **Minimum Limit Validation**: Must enter minimum limit before saving
- **Maximum Limit Validation**: Must enter maximum limit before saving
- **Supply Time Validation**: Must enter supply time before saving
- **Reliance Time Validation**: Must enter reliance time before saving

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Item Type Validation**: Ensures item type is active and available
- **Vendor Validation**: Ensures vendor is active and available
- **Minimum Limit Validation**: Ensures minimum limit is positive and within limits
- **Maximum Limit Validation**: Ensures maximum limit is greater than minimum limit
- **Supply Time Validation**: Ensures supply time is positive and within limits
- **Reliance Time Validation**: Ensures reliance time is positive and within limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Item Type Access**: Ensures user has access to selected item type
- **Vendor Access**: Ensures user has access to selected vendor
- **Min/Max Access**: Ensures user can access and modify min/max records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: "تم البحث بنجاح" (Search completed successfully)
- **Save Success**: "تم حفظ البيانات" (Data saved successfully)
- **Confirmation Success**: "تم تأكيد المدخلات" (Inputs confirmed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of min/max grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Min/Max Management System**
- **Database Tables**:
  - `Inventories_item_type` - Item type master data
  - `Customer_Supplier` - Vendor master data
  - `inventories_Min_Max_Temp` - Temporary min/max records
  - `inventories_Min_Max_Header` - Min/max header information
  - `inventories_Min_Max_details` - Min/max details with item information
- **Integration Details**:
  - Item type selection controls data filtering
  - Vendor selection controls data filtering
  - Min/max limits tracked for each item
  - Supply time and reliance time tracked for each item
- **Data Flow**:
  - Items filtered by item type and vendor
  - Min/max limits entered for each item
  - Data saved and confirmed

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all min/max operations
  - Item type access controlled by user permissions
  - Vendor access controlled by user permissions

### Data Exchange

#### **Item Type and Vendor Information**
- **Database Tables**:
  - `Inventories_item_type` - Item type master data
  - `Customer_Supplier` - Vendor master data
- **Real-time Data**:
  - Item type information for filtering
  - Vendor information for filtering
  - Min/max limits and times
- **Data Relationships**:
  - Item types linked to items via item_code
  - Vendors linked to min/max via supplier
  - Items linked to min/max via item_code

#### **Min/Max and Item Information**
- **Database Tables**:
  - `inventories_Min_Max_Temp` - Temporary min/max records
  - `inventories_Min_Max_Header` - Min/max header information
  - `inventories_Min_Max_details` - Min/max details with item information
- **Real-time Data**:
  - Min/max limits and times
  - Item information and descriptions
  - Supply time and reliance time
- **Data Relationships**:
  - Items linked to min/max via item_code
  - Min/max limits tracked for each item
  - Supply time and reliance time tracked for each item

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع الصنف" Error**
- **Cause**: Item type not selected before loading data
- **Solution**: Always select item type before loading data
- **Prevention**: Item type selection is required for all operations

#### **"الرجاء اختيار المورد" Error**
- **Cause**: Vendor not selected before loading data
- **Solution**: Always select vendor before loading data
- **Prevention**: Vendor selection is required for all operations

#### **"الحد الادنى يجب أن يكون أكبر من صفر" Error**
- **Cause**: Minimum limit not positive
- **Solution**: Always enter positive minimum limit values
- **Prevention**: Minimum limit validation is required for all operations

#### **"الحد الاقصى يجب أن يكون أكبر من الحد الادنى" Error**
- **Cause**: Maximum limit not greater than minimum limit
- **Solution**: Always enter maximum limit greater than minimum limit
- **Prevention**: Maximum limit validation is required for all operations

#### **No Data Found**
- **Cause**: Filters are too restrictive
- **Solution**: Adjust filters to find data
- **Prevention**: Ensure filters are properly set

#### **Data Save Failed Error**
- **Cause**: Data cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

#### **Data Confirmation Failed Error**
- **Cause**: Data cannot be confirmed
- **Solution**: Verify all items have valid min/max limits
- **Prevention**: Ensure proper validation before confirmation

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Min/Max Access**: Access to min/max management operations
- **Item Type Access**: Access to item types with min/max data
- **Vendor Access**: Access to vendors with min/max data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Min/Max Workflow**: Understanding of min/max management process
- **Item Type Management**: Knowledge of item type selection and filtering
- **Vendor Management**: Knowledge of vendor selection and filtering
- **Min/Max Management**: Familiarity with min/max limits and times

## Usage Examples

### Basic Min/Max Management Workflow

1. **Page Load**: Verify page loads with default data
2. **Item Type Selection**: Select item type for filtering
3. **Vendor Selection**: Select vendor for filtering
4. **Data Search**: Search for items based on filters
5. **Data Review**: Review items in grid
6. **Min/Max Entry**: Enter min/max limits for each item
7. **Supply Time Entry**: Enter supply time for each item
8. **Reliance Time Entry**: Enter reliance time for each item
9. **Data Save**: Save min/max limits for items
10. **Data Confirmation**: Confirm min/max limits for items

### Min/Max Limits Management Workflow

1. **Item Type Selection**: Select item type for filtering
2. **Vendor Selection**: Select vendor for filtering
3. **Data Search**: Search for items based on filters
4. **Data Review**: Review items with min/max limits
5. **Min/Max Update**: Update min/max limits as needed
6. **Supply Time Update**: Update supply time as needed
7. **Reliance Time Update**: Update reliance time as needed
8. **Data Save**: Save updated min/max limits
9. **Data Confirmation**: Confirm updated min/max limits

### Multi-Item Min/Max Management

1. **Item Type Selection**: Select item type for filtering
2. **Vendor Selection**: Select vendor for filtering
3. **Data Search**: Search for items based on filters
4. **Multiple Item Selection**: Select multiple items for min/max setting
5. **Min/Max Entry**: Enter min/max limits for each item
6. **Supply Time Entry**: Enter supply time for each item
7. **Reliance Time Entry**: Enter reliance time for each item
8. **Data Save**: Save min/max limits for all items
9. **Data Confirmation**: Confirm min/max limits for all items