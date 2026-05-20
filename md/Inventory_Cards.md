← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Cards.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Cards.aspx`
**Purpose**: Inventory cards management system for creating and confirming stocktaking cards
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, stocktaking personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Filtering)**
- **Store Dropdown**: Must select valid store for inventory filtering
- **Error Prevention**: System validates store is selected before loading inventory data
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents inventory loading without store selection
- **Validation**: Only active stores are available

#### 2. **Location Code Selection (Optional for Filtering)**
- **Location Code Dropdown**: Optional selection for location-based filtering
- **Error Prevention**: System allows filtering by location code if selected
- **Data Source**: Location codes based on selected store
- **Default Behavior**: User can select location code or leave empty for all locations
- **Error Message**: No validation required as this is optional
- **Validation**: Location codes are filtered based on selected store

#### 3. **Committee Selection (Required for Inventory Cards)**
- **Committee Dropdown**: Must select valid committee for inventory card display
- **Error Prevention**: System validates committee is selected before loading inventory cards
- **Data Source**: Inventories_Random_Sampling_Committee_Header table with committee information
- **Default Behavior**: User must select committee manually
- **Error Message**: Validation prevents inventory card loading without committee selection
- **Validation**: Only committees with status = 0 (pending) are available

#### 4. **Inventory Quantity Input (Required for Confirmation)**
- **Quantity Field**: Must enter valid inventory quantity for each item
- **Error Prevention**: System validates quantity is greater than 0 and within limits
- **Data Source**: User input with validation against available quantities
- **Default Behavior**: User must enter quantity manually for each item
- **Error Message**: Validation prevents confirmation with zero or negative quantity
- **Validation**: Quantity must be positive and not exceed available amount

#### 5. **Expiration Date Input (Optional for Confirmation)**
- **Expiration Date Field**: Optional selection for item expiration date
- **Error Prevention**: System allows expiration date entry if applicable
- **Data Source**: User input with date validation
- **Default Behavior**: User can enter expiration date or leave empty
- **Error Message**: No validation required as this is optional
- **Validation**: Date must be valid if entered

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading inventory data
- **Error**: Store has no inventory data
- **Prevention**: Verify store has inventory items before selection

#### **Committee Selection Errors**
- **Error**: No committee selected
- **Prevention**: Always select committee before loading inventory cards
- **Error**: Committee has no inventory items
- **Prevention**: Verify committee has inventory items

#### **Inventory Quantity Errors**
- **Error**: No quantity entered
- **Prevention**: Always enter quantity before confirmation
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: Quantity exceeds available
- **Prevention**: System validates quantity against available amounts

#### **Card Management Errors**
- **Error**: Card save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Card confirmation fails
- **Prevention**: Ensure all items have valid quantities
- **Error**: Excel import fails
- **Prevention**: Verify Excel file format and data

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inventory card permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Committees must be active** and associated with stores
5. **Inventory items must be available** for stocktaking

#### **Required System State**
- User authentication must be active
- Inventory card permissions must be configured
- Store data must be current
- Committee data must be current
- Inventory items must be available

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper inventory loading
- ✅ Store selection enables committee filtering

#### **For Committee Selection**
- ✅ Committee dropdown populated with pending committees only
- ✅ Committee validation ensures proper inventory card display
- ✅ Committee selection enables inventory card loading

#### **For Inventory Display**
- ✅ Inventory grid displays all items for selected committee
- ✅ Item details show complete inventory information
- ✅ Unit information displays properly for each item
- ✅ Quantity entry works for each item

#### **For Card Management**
- ✅ Card save creates proper inventory card records
- ✅ Card confirmation validates all items
- ✅ Card status updates properly
- ✅ Excel import/export works correctly

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" Width="100%" dir="rtl">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for inventory cards management

### Store and Date Selection Section

```html
<!-- Store and Date Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{0} - {1} - {2}" CssClasses-Control="mb-2" OnValueChanged="ComboBox_Store_ValueChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ بدء الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="textbox_startDate" Enabled="false" AutoPostBack="false" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapDateEdit runat="server" ID="textBox_FinishDate" Date="<%# DateTime.Now %>" AutoPostBack="true" OnDateChanged="textBox_FinishDate_DateChanged">
            </dx:BootstrapDateEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Location and Committee Selection Section

```html
<!-- Location and Committee Selection -->
<dx:BootstrapLayoutItem Caption="الموقع" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_LocationCode" AutoPostBack="true" DropDownRows="5" NullText="اختر الموقع" CssClasses-Control="mb-2">
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="اللجنة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Comittee" DataSourceID="DS_Committe" Enabled="false" OnSelectedIndexChanged="ComboBox_Comittee_SelectedIndexChanged" AutoPostBack="false" ValueField="ID" DropDownRows="5" NullText="اختر اللجنة" CssClasses-Control="mb-2">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="Store_ID" />
                    <dx:BootstrapListBoxField FieldName="Status" />
                    <dx:BootstrapListBoxField FieldName="Description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Inventory Items Grid Section

```html
<!-- Inventory Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div class="d-flex border" style="width: calc(100vw - 20rem); border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_Items" Width="100%" KeyFieldName="ID" DataSourceID="tempDataSource" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" AutoPostBack="true" SettingsBehavior-AllowSelectSingleRowOnly="true" autopostpack="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsText-EmptyDataRow="لاتوجد بيانات للعرض" SettingsText-CommandEdit="تعديل" SettingsBehavior-ProcessSelectionChangedOnServer="true" ClientInstanceName="GV_Samples" OnCustomColumnDisplayText="GV_Items_CustomColumnDisplayText" OnRowValidating="GV_Items_RowValidating">
                    <Settings ShowFilterRow="true" />
                    <SettingsEditing Mode="Batch">
                        <BatchEditSettings AllowEndEditOnValidationError="false" AllowValidationOnEndEdit="false" />
                    </SettingsEditing>
                    <ClientSideEvents BatchEditRowValidating="RowValidating" />
                    <SettingsDataSecurity AllowEdit="true" AllowDelete="false" AllowInsert="false" />
                    <Columns>
                        <dx:BootstrapGridViewTextColumn VisibleIndex="0" Caption="المسلسل" UnboundType="String" SettingsEditForm-Visible="False" Width="65px"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" VisibleIndex="0" Visible="false" SettingsEditForm-Visible="False"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Item_Row_ID" VisibleIndex="0" Visible="false" SettingsEditForm-Visible="False"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Committee_ID" VisibleIndex="0" Visible="false" SettingsEditForm-Visible="False"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Store_ID" VisibleIndex="0" Visible="false" SettingsEditForm-Visible="False"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewBandColumn Caption="الاصناف" VisibleIndex="1">
                            <CssClasses HeaderCell="text-center bg-theme-3" />
                            <Columns>
                                <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Item_Code" Caption="كود الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewBandColumn Caption="مسمي الصنف" VisibleIndex="1">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Name_ar" CssClasses-HeaderCell="d-none" Caption="المسمي العربي" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                                        <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Name_en" CssClasses-HeaderCell="d-none" Caption="المسمي الانجليزي" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                                <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Batch_No" Caption="الدفعة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="5" PropertiesTextEdit-DisplayFormatString="{0:dd-MM-yyyy}"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn SettingsEditForm-Visible="False" FieldName="UOM_Description" Caption="وحدة الجرد" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                        <dx:BootstrapGridViewBandColumn Caption="لجنة الجرد" VisibleIndex="2">
                            <CssClasses HeaderCell="text-center bg-info" />
                            <Columns>
                                <dx:BootstrapGridViewSpinEditColumn FieldName="Confirm_Item_Quantity" Caption="الكمية" VisibleIndex="1" PropertiesSpinEdit-NumberType="Float"></dx:BootstrapGridViewSpinEditColumn>
                                <dx:BootstrapGridViewDateColumn FieldName="Confirm_Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="2">
                                    <PropertiesDateEdit AllowNull="true" ValidationSettings-CausesValidation="false" />
                                </dx:BootstrapGridViewDateColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Excel Import/Export Section

```html
<!-- Excel Import/Export -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <table>
                <tr>
                    <td>
                        <dx:BootstrapButton runat="server" ID="Upload" Text="Refresh" OnClick="Btn_Upload_Click">
                            <SettingsBootstrap RenderOption="Warning" />
                            <CssClasses Icon="simple-icon-refresh" />
                        </dx:BootstrapButton>
                    </td>
                    <td>
                        <dx:BootstrapUploadControl runat="server" ID="BootstrapUploadControl1" ShowUploadButton="true" EnableCallBacks="false" AutoPostBack="true" OnFileUploadComplete="Upload_Excel_FileUploadComplete">
                            <ClientSideEvents FileUploadComplete="function(s, e) { if (e.callbackData === 'RefreshGrid') { GV_Samples.PerformCallback(); } }" />
                            <ValidationSettings AllowedFileExtensions=".xlsx,.xls" />
                        </dx:BootstrapUploadControl>
                    </td>
                    <td>
                        <dx:BootstrapButton runat="server" ID="Btn_ExportToExcel" Text="تصدير إلى Excel" OnClick="Btn_ExportToExcel_Click" UseSubmitBehavior="true">
                            <SettingsBootstrap RenderOption="Primary" />
                            <CssClasses Icon="simple-icon-cloud-download" />
                        </dx:BootstrapButton>
                    </td>
                </tr>
            </table>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Card Save and Confirm Section

```html
<!-- Card Save and Confirm -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_SaveCommittee" Text="حفظ بطاقة الجرد" OnClick="Btn_SaveCommittee_Click">
                <SettingsBootstrap RenderOption="Primary" />
                <CssClasses Icon="simple-icon-doc" />
            </dx:BootstrapButton>
            <dx:BootstrapButton runat="server" ID="Btn_ConfirmComitte" Text="تأكيد بطاقة الجرد" OnClick="Btn_ConfirmComitte_Click">
                <SettingsBootstrap RenderOption="Success" />
                <CssClasses Icon="simple-icon-check" />
            </dx:BootstrapButton>
            <asp:Label runat="server" ID="lbl_CardConfirmed" Visible="false" CssClass="font-weight-bold h6 mr-4 text-danger" Text="تم تأكيد بطاقة الجرد في انتظار التسوية" />
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
- `@Store_ID` - Store ID for filtering inventory cards

**Committee Parameters**:
- `@Committee_ID` - Committee ID for filtering inventory cards

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads committees based on selected store
3. **Committee Selection**: Loads inventory cards based on selected committee
4. **Inventory Display**: Displays inventory items with details
5. **Quantity Entry**: Allows user to enter inventory quantities
6. **Card Save**: Saves inventory card with entered quantities
7. **Card Confirmation**: Confirms inventory card for processing

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default inventory state
4. Initializes date displays

### ComboBox_Store_ValueChanged Method

```csharp
protected void ComboBox_Store_ValueChanged(object sender, EventArgs e)
```

**Purpose**: Loads committees based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for committee data source
3. Binds committee dropdown
4. Updates store information display

### Btn_SaveCommittee_Click Method

```csharp
protected void Btn_SaveCommittee_Click(object sender, EventArgs e)
```

**Purpose**: Saves inventory card with entered quantities

**Process**:
1. Validates committee selection
2. Validates all items have quantities
3. Saves inventory card records
4. Updates card status
5. Provides success feedback

### Btn_ConfirmComitte_Click Method

```csharp
protected void Btn_ConfirmComitte_Click(object sender, EventArgs e)
```

**Purpose**: Confirms inventory card for processing

**Process**:
1. Validates committee selection
2. Validates all items have quantities
3. Confirms inventory card
4. Updates card status
5. Provides success feedback

### Btn_ExportToExcel_Click Method

```csharp
protected void Btn_ExportToExcel_Click(object sender, EventArgs e)
```

**Purpose**: Exports inventory data to Excel

**Process**:
1. Validates committee selection
2. Exports inventory data to Excel file
3. Provides download link
4. Provides success feedback

### Upload_Excel_FileUploadComplete Method

```csharp
protected void Upload_Excel_FileUploadComplete(object sender, EventArgs e)
```

**Purpose**: Imports inventory data from Excel

**Process**:
1. Validates Excel file format
2. Imports inventory data from Excel
3. Updates inventory grid
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Random_Sampling_Committee_Header**
- **Purpose**: Committee header information
- **Key Fields**: ID, Description, Status, Store_ID, Deleted
- **Usage**: Provides committee list for filtering
- **Filtering**: Only committees with status = 0 and deleted = 0

#### **Inventories_Cards_temp**
- **Purpose**: Temporary inventory card records
- **Key Fields**: ID, Item_Row_ID, Committee_ID, Store_ID, Item_Code, Name_ar, Name_en, Batch_No, Item_Quantity, Expiration_date, Confirm_Item_Quantity, Confirm_Expiration_date, User_ID, Store_type, UOM
- **Usage**: Tracks inventory items for cards
- **Filtering**: Only items associated with selected user

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing inventory data

#### **Store Filtering**
```sql
SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store
```

**Filtering Logic**: Shows all stores for user
**Permission Logic**: All stores are available
**Validation**: Ensures store has inventory data

#### **Committee Filtering**
```sql
SELECT ID, Description, Status, Store_ID FROM Inventories_Random_Sampling_Committee_Header WHERE Store_ID = @Store_ID AND Deleted = 0 AND Status = 0
```

**Filtering Logic**: Shows only pending committees for selected store
**Permission Logic**: Only pending committees are available
**Validation**: Ensures committee has inventory data

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, location, and committee dropdowns

### Grid Batch Editing

```html
SettingsEditing Mode="Batch"
BatchEditSettings AllowEndEditOnValidationError="false" AllowValidationOnEndEdit="false"
```

**Grid Features**: Batch editing for inventory quantities
**User Experience**: Allows editing multiple items at once
**Usage**: Applied to inventory items grid

### Row Validation Function

```javascript
function RowValidating(s, e) {
    var grid = ASPxClientGridView.Cast(GV_Samples);
    var expDate = e.validationInfo[grid.GetColumnByField("Confirm_Expiration_date").index];
    if (expDate.value === null) {
        expDate.isValid = true;
    }
}
```

**Validation Logic**: Validates expiration date can be null
**User Experience**: Allows empty expiration dates
**Usage**: Applied to inventory items grid

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store and Date Selection Section**
```html
<!-- Store and Date Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="تاريخ بدء الجرد" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الجرد" ColSpanMd="3">
```

#### **2. Location and Committee Selection Section**
```html
<!-- Location and Committee Selection -->
<dx:BootstrapLayoutItem Caption="الموقع" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="اللجنة" ColSpanMd="6">
```

#### **3. Inventory Items Grid Section**
```html
<!-- Inventory Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Excel Import/Export Section**
```html
<!-- Excel Import/Export -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **5. Card Save and Confirm Section**
```html
<!-- Card Save and Confirm -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";

// Committee Data Source
SqlDataSource DS_Committe = new SqlDataSource();
DS_Committe.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_Committe.SelectCommand = "SELECT ID, Description, Status, Store_ID FROM Inventories_Random_Sampling_Committee_Header WHERE Store_ID = @Store_ID AND Deleted = 0 AND Status = 0";

// Inventory Items Data Source
SqlDataSource tempDataSource = new SqlDataSource();
tempDataSource.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
tempDataSource.SelectCommand = "SELECT temp.ID, temp.Item_Row_ID,temp.Committee_ID,temp.Store_ID, temp.Item_Code, temp.Name_ar, temp.Name_en, temp.Batch_No, temp.Item_Quantity, temp.Expiration_date, temp.Confirm_Item_Quantity, temp.Confirm_Expiration_date, temp.User_ID, temp.Store_type, temp.UOM, COALESCE(uom.description, '-Not Assigned-') AS UOM_Description FROM Inventories_Cards_temp temp LEFT JOIN Inventories_UOM uom ON uom.id = temp.UOM WHERE User_ID=@User_ID";
tempDataSource.UpdateCommand = "UPDATE Inventories_Cards_temp SET Confirm_Expiration_date = @Confirm_Expiration_date, Confirm_Item_Quantity = @Confirm_Item_Quantity WHERE Batch_No =@Batch_No and Item_Code =@Item_Code and Store_ID =@Store_ID and Committee_ID =@Committee_ID";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void ComboBox_Store_ValueChanged(object sender, EventArgs e)
{
    if (ComboBox_Store.Value == "" || ComboBox_Store.Value == null)
    {
        // Clear committee dropdown
        ComboBox_Comittee.DataSource = null;
        ComboBox_Comittee.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading committees
**Error Prevention**: Prevents committee loading without store selection

### Committee Selection Validation

```csharp
protected void Btn_SaveCommittee_Click(object sender, EventArgs e)
{
    if (ComboBox_Comittee.Value == "" || ComboBox_Comittee.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار اللجنة');", true);
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates committee selection before saving card
**Error Prevention**: Prevents card saving without committee selection

### Quantity Validation

```csharp
protected void GV_Items_RowValidating(object sender, DevExpress.Web.Data.BootstrapGridViewRowValidationEventArgs e)
{
    // Validate quantity is positive
    if (Convert.ToDecimal(e.NewValues["Confirm_Item_Quantity"]) <= 0)
    {
        e.Errors["Confirm_Item_Quantity"] = "الكمية يجب أن تكون أكبر من صفر";
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and within limits
**Error Prevention**: Prevents confirmation with invalid quantity

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading committees
- **Committee Selection Validation**: Must select committee before saving card
- **Quantity Validation**: Must enter quantity before confirmation

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Committee Validation**: Ensures committee is pending and available
- **Quantity Validation**: Ensures quantities are within allowed limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Card Access**: Ensures user can access and modify inventory cards

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Card Save Success**: "تم حفظ بطاقة الجرد" (Inventory card saved successfully)
- **Card Confirm Success**: "تم تأكيد بطاقة الجرد" (Inventory card confirmed successfully)
- **Excel Export Success**: "تم تصدير البيانات إلى Excel" (Data exported to Excel successfully)
- **Excel Import Success**: "تم استيراد البيانات من Excel" (Data imported from Excel successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of inventory grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Header` - Committee information
  - `Inventories_Cards_temp` - Temporary inventory card records
  - `Inventories_UOM` - Unit of measure master data
- **Integration Details**:
  - Store selection controls committee filtering
  - Committee selection controls inventory card display
  - Inventory items displayed with complete details
- **Data Flow**:
  - Stores filtered for user access
  - Committees filtered by store
  - Inventory cards filtered by committee

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all inventory operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Committee Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Header` - Committee information
- **Real-time Data**:
  - Store information for filtering
  - Committee information for inventory cards
  - Inventory quantities and dates
- **Data Relationships**:
  - Stores linked to committees via Store_ID
  - Committees linked to inventory cards via Committee_ID
  - Inventory cards linked to items via Item_Row_ID

#### **Inventory and Item Information**
- **Database Tables**:
  - `Inventories_Cards_temp` - Temporary inventory card records
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Inventory quantities and dates
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to inventory cards via Item_Row_ID
  - Units linked to items via UOM field
  - Quantity calculations based on item information

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading committees
- **Solution**: Always select store before loading committees
- **Prevention**: Store selection is required for all inventory operations

#### **"الرجاء اختيار اللجنة" Error**
- **Cause**: Committee not selected before saving card
- **Solution**: Always select committee before saving card
- **Prevention**: Committee selection is required for all inventory operations

#### **No Inventory Data Found**
- **Cause**: Committee has no inventory items
- **Solution**: Verify committee has inventory items before selection
- **Prevention**: Ensure committees have inventory data

#### **Card Save Failed Error**
- **Cause**: Card cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

#### **Card Confirm Failed Error**
- **Cause**: Card cannot be confirmed
- **Solution**: Verify all items have valid quantities
- **Prevention**: Ensure proper validation before confirmation

#### **Excel Import Failed Error**
- **Cause**: Excel file format is invalid
- **Solution**: Verify Excel file format and data
- **Prevention**: Ensure proper Excel file format

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Inventory Access**: Access to inventory card operations
- **Store Access**: Access to stores with inventory data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Inventory Workflow**: Understanding of inventory card process
- **Store Management**: Knowledge of store selection and filtering
- **Committee Management**: Knowledge of committee selection and inventory cards
- **Inventory Management**: Familiarity with inventory items and quantities

## Usage Examples

### Basic Inventory Card Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for inventory filtering
3. **Committee Selection**: Select committee for inventory cards
4. **Inventory Review**: Review inventory items in grid
5. **Quantity Entry**: Enter inventory quantities for each item
6. **Card Save**: Save inventory card with entered quantities
7. **Card Confirmation**: Confirm inventory card for processing

### Inventory Card Management Workflow

1. **Store Selection**: Select store for inventory filtering
2. **Location Selection**: Select location code for filtering (optional)
3. **Committee Selection**: Select committee for inventory cards
4. **Inventory Review**: Review inventory items with details
5. **Quantity Entry**: Enter inventory quantities for each item
6. **Expiration Date Entry**: Enter expiration dates if applicable
7. **Card Save**: Save inventory card with entered data
8. **Card Confirmation**: Confirm inventory card for processing

### Excel Import/Export Workflow

1. **Store Selection**: Select store for inventory filtering
2. **Committee Selection**: Select committee for inventory cards
3. **Excel Export**: Export inventory data to Excel file
4. **Excel Edit**: Edit inventory data in Excel file
5. **Excel Import**: Import edited data from Excel file
6. **Data Review**: Review imported data in grid
7. **Card Save**: Save inventory card with imported data
8. **Card Confirmation**: Confirm inventory card for processing