← Go back to 
[Inventories Module Documentation](/Inventories)


# Inspection_procedures.aspx

## Overview

**File**: `\Inventories\Process\Inspection_procedures.aspx`
**Purpose**: Inspection procedures configuration system for inventory management with various dispensing and transfer workflows
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, procedure managers, workflow coordinators

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Procedure Type Selection (Required for Configuration)**
- **Procedure Type Radio Buttons**: Must select valid procedure type for configuration
- **Error Prevention**: System validates procedure type is selected before loading sub-procedures
- **Data Source**: Static radio button groups with procedure type options
- **Default Behavior**: User must select procedure type manually
- **Error Message**: Validation prevents sub-procedure loading without procedure type selection
- **Validation**: Only valid procedure types are available

#### 2. **Dispensing Source Selection (Required for Configuration)**
- **Dispensing Source Radio Buttons**: Must select valid dispensing source for configuration
- **Error Prevention**: System validates dispensing source is selected before loading procedures
- **Data Source**: Static radio button groups with dispensing source options
- **Default Behavior**: User must select dispensing source manually
- **Error Message**: Validation prevents procedure loading without dispensing source selection
- **Validation**: Only valid dispensing sources are available

#### 3. **Dispensing Target Selection (Required for Configuration)**
- **Dispensing Target Radio Buttons**: Must select valid dispensing target for configuration
- **Error Prevention**: System validates dispensing target is selected before loading procedures
- **Data Source**: Static radio button groups with dispensing target options
- **Default Behavior**: User must select dispensing target manually
- **Error Message**: Validation prevents procedure loading without dispensing target selection
- **Validation**: Only valid dispensing targets are available

#### 4. **Procedure Sub-Type Selection (Required for Configuration)**
- **Procedure Sub-Type Radio Buttons**: Must select valid procedure sub-type for configuration
- **Error Prevention**: System validates procedure sub-type is selected before loading procedures
- **Data Source**: Static radio button groups with procedure sub-type options
- **Default Behavior**: User must select procedure sub-type manually
- **Error Message**: Validation prevents procedure loading without procedure sub-type selection
- **Validation**: Only valid procedure sub-types are available

#### 5. **Main Procedure Type Dropdown (Required for Configuration)**
- **Main Procedure Type Dropdown**: Must select valid main procedure type for configuration
- **Error Prevention**: System validates main procedure type is selected before loading sub-procedures
- **Data Source**: Patient_information table (placeholder for procedure types)
- **Default Behavior**: User must select main procedure type manually
- **Error Message**: Validation prevents sub-procedure loading without main procedure type selection
- **Validation**: Only valid main procedure types are available

#### 6. **Sub-Procedure Dropdown (Required for Configuration)**
- **Sub-Procedure Dropdown**: Must select valid sub-procedure for configuration
- **Error Prevention**: System validates sub-procedure is selected before loading configuration
- **Data Source**: Patient_information table (placeholder for sub-procedures)
- **Default Behavior**: User must select sub-procedure manually
- **Error Message**: Validation prevents configuration loading without sub-procedure selection
- **Validation**: Only valid sub-procedures are available

#### 7. **Dispensing Request Number Input (Required for Retrieval)**
- **Dispensing Request Number Field**: Must enter valid dispensing request number for retrieval
- **Error Prevention**: System validates dispensing request number is entered before retrieval
- **Data Source**: User input with validation
- **Default Behavior**: User must enter dispensing request number manually
- **Error Message**: Validation prevents retrieval without dispensing request number
- **Validation**: Dispensing request number must be valid

### Common Error Scenarios and Prevention

#### **Procedure Type Errors**
- **Error**: No procedure type selected
- **Prevention**: Always select procedure type before loading sub-procedures
- **Error**: Invalid procedure type
- **Prevention**: Verify procedure type is valid and available

#### **Dispensing Source Errors**
- **Error**: No dispensing source selected
- **Prevention**: Always select dispensing source before loading procedures
- **Error**: Invalid dispensing source
- **Prevention**: Verify dispensing source is valid and available

#### **Dispensing Target Errors**
- **Error**: No dispensing target selected
- **Prevention**: Always select dispensing target before loading procedures
- **Error**: Invalid dispensing target
- **Prevention**: Verify dispensing target is valid and available

#### **Procedure Sub-Type Errors**
- **Error**: No procedure sub-type selected
- **Prevention**: Always select procedure sub-type before loading procedures
- **Error**: Invalid procedure sub-type
- **Prevention**: Verify procedure sub-type is valid and available

#### **Main Procedure Type Errors**
- **Error**: No main procedure type selected
- **Prevention**: Always select main procedure type before loading sub-procedures
- **Error**: Invalid main procedure type
- **Prevention**: Verify main procedure type is valid and available

#### **Sub-Procedure Errors**
- **Error**: No sub-procedure selected
- **Prevention**: Always select sub-procedure before loading configuration
- **Error**: Invalid sub-procedure
- **Prevention**: Verify sub-procedure is valid and available

#### **Dispensing Request Number Errors**
- **Error**: No dispensing request number entered
- **Prevention**: Always enter dispensing request number before retrieval
- **Error**: Invalid dispensing request number
- **Prevention**: Verify dispensing request number is valid

#### **Configuration Management Errors**
- **Error**: Configuration save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Configuration load fails
- **Prevention**: Ensure proper permissions for configuration access
- **Error**: Configuration delete fails
- **Prevention**: Select valid configuration before deleting

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have procedure configuration permissions** via employee group assignments
3. **Procedure types must be configured** in the system
4. **Dispensing sources must be configured** in the system
5. **Dispensing targets must be configured** in the system
6. **Procedure sub-types must be configured** in the system

#### **Required System State**
- User authentication must be active
- Procedure configuration permissions must be configured
- Procedure type data must be current
- Dispensing source data must be current
- Dispensing target data must be current
- Procedure sub-type data must be current

### Success Criteria

#### **For Procedure Type Selection**
- ✅ Procedure type radio buttons populated with valid options only
- ✅ Procedure type validation ensures proper sub-procedure loading
- ✅ Procedure type selection enables sub-procedure configuration

#### **For Dispensing Source Selection**
- ✅ Dispensing source radio buttons populated with valid options only
- ✅ Dispensing source validation ensures proper procedure loading
- ✅ Dispensing source selection enables procedure configuration

#### **For Dispensing Target Selection**
- ✅ Dispensing target radio buttons populated with valid options only
- ✅ Dispensing target validation ensures proper procedure loading
- ✅ Dispensing target selection enables procedure configuration

#### **For Procedure Sub-Type Selection**
- ✅ Procedure sub-type radio buttons populated with valid options only
- ✅ Procedure sub-type validation ensures proper procedure loading
- ✅ Procedure sub-type selection enables procedure configuration

#### **For Main Procedure Type Selection**
- ✅ Main procedure type dropdown populated with valid options only
- ✅ Main procedure type validation ensures proper sub-procedure loading
- ✅ Main procedure type selection enables sub-procedure configuration

#### **For Sub-Procedure Selection**
- ✅ Sub-procedure dropdown populated with valid options only
- ✅ Sub-procedure validation ensures proper configuration loading
- ✅ Sub-procedure selection enables configuration management

#### **For Configuration Management**
- ✅ Configuration save creates proper configuration records
- ✅ Configuration load displays proper configuration data
- ✅ Configuration delete removes configuration records
- ✅ Configuration workflow works with proper validation

#### **For Data Management**
- ✅ Configuration grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout">
```

**Form Layout**: Bootstrap form layout with vertical structure for inspection procedures configuration

### Procedure Type Selection Section

```html
<!-- Procedure Type Selection -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <SettingsItems HorizontalAlign="Right" />
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="rb_basic_data" Text="تحويل المواد بين المخازن" GroupName="a"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton1" Text="صرف مواد للتشغيل" GroupName="a"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Dispensing Source Selection Section

```html
<!-- Dispensing Source Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton2" Text="الصرف من المخزن الرئيسي" GroupName="b"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton3" Text="الصرف من المخزن الفرعي" GroupName="b"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton4" Text="الصرف من مخزن الاقسام" GroupName="b"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton5" Text="الصرف من عربة الطوارئ" GroupName="b"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Dispensing Target Selection Section

```html
<!-- Dispensing Target Selection -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton6" Text="الصرف الي الادارات _ عام" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton7" Text="الصرف الي الادارات _ موظف" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton8" Text="الصرف الي تشغيل _ الالات والمعدات" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton9" Text="الصرف الي حساب مريض" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton10" Text="صرف قطع غيار" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton11" Text="صرف الاصول الثابتة" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton12" Text="صرف اصناف عهدة للاسترجاع" GroupName="d"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Procedure Sub-Type Selection Section

```html
<!-- Procedure Sub-Type Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton13" Text="صرف حصص التشغيل المحدده" GroupName="c"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapRadioButton runat="server" ID="BootstrapRadioButton14" Text="تنفيذ طلب صرف" GroupName="c"></dx:BootstrapRadioButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Configuration Input Section

```html
<!-- Configuration Input -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="قائمة منسدله لنوع الاجراء الرئيسي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="MR" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="MR_Datasorce" ValueField="FileID" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileID" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="قائمة منسدله للاجراء الفرعي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="BootstrapComboBox1" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="MR_Datasorce" ValueField="FileID" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileID" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="قائمة منسدله للاجراء الفرعي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="BootstrapComboBox2" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="MR_Datasorce" ValueField="FileID" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileID" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="قائمة منسدله للاجراء الفرعي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="BootstrapComboBox3" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="MR_Datasorce" ValueField="FileID" TextField="Patient_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="FileID" />
                            <dx:BootstrapListBoxField FieldName="Patient_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="استرجاع رقم طلب الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="arabic_name" AutoPostBack="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Save" runat="server" ClientInstanceName="btn" Width="150px" Text="اضافة" OnClick="Save_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Configuration Grid Section

```html
<!-- Configuration Grid -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="TawreedGrid" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="id" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="id" ReadOnly="True" Visible="false" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Basic_Data_from" Caption="كود" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Basic_Data_from1" Caption="مسمي الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="english_name" Caption="كمية الطلب" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="وحدة الطلب" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="location_account_id" Caption="الادارة" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ar_name" VisibleIndex="6" Caption="الموظف"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="account_center_id" Caption="المعدة" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Cost_Name_AR" Caption="ملف طبي" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="department_type" Caption="حساب مريض" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Name" VisibleIndex="10" Caption="مسؤل التشغيل"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="account_center_type" Caption="الموظف" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="account_center_name" VisibleIndex="12" Caption="الموظف"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="department_status" Caption="الموظف" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="department_status1" VisibleIndex="14" Caption="الموظف"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="management_type" Caption="الموظف" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="management_type1" VisibleIndex="16" Caption="الموظف"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="permitted_procedures" Caption="الموظف" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                    </dx:BootstrapGridView>
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
- `@emp` - Employee code for filtering permissions

**Configuration Parameters**:
- `@FileID` - File ID for filtering configurations

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Procedure Type Selection**: Loads sub-procedures based on selected procedure type
3. **Dispensing Source Selection**: Loads procedures based on selected dispensing source
4. **Dispensing Target Selection**: Loads procedures based on selected dispensing target
5. **Procedure Sub-Type Selection**: Loads procedures based on selected procedure sub-type
6. **Main Procedure Type Selection**: Loads sub-procedures based on selected main procedure type
7. **Sub-Procedure Selection**: Loads configuration based on selected sub-procedure
8. **Configuration Save**: Creates complete configuration records
9. **Configuration Load**: Displays configuration data
10. **Configuration Delete**: Removes configuration records

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Disables readonly fields appropriately
3. Sets default configuration state

### Save_Click Method

```csharp
protected void Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves configuration based on selected options

**Process**:
1. Validates all required fields are filled
2. Validates procedure type selection
3. Validates dispensing source selection
4. Validates dispensing target selection
5. Validates procedure sub-type selection
6. Validates main procedure type selection
7. Validates sub-procedure selection
8. Inserts configuration record
9. Refreshes configuration grid
10. Provides success feedback

## Database Integration

### Core Database Tables

#### **Patient_information** (Placeholder)
- **Purpose**: Placeholder for procedure type data
- **Key Fields**: FileID, Patient_Name
- **Usage**: Provides procedure type list for filtering
- **Filtering**: Placeholder for actual procedure types

#### **Inventories_Procedures_Configuration** (Assumed)
- **Purpose**: Procedure configuration records
- **Key Fields**: id, Basic_Data_from, Basic_Data_from1, english_name, arabic_name, location_account_id, ar_name, account_center_id, Cost_Name_AR, department_type, Name, account_center_type, account_center_name, department_status, department_status1, management_type, management_type1, permitted_procedures
- **Usage**: Tracks procedure configurations
- **Filtering**: Only active configurations

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing configuration operations

## Client-Side JavaScript

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

#### **1. Procedure Type Selection Section**
```html
<!-- Procedure Type Selection -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Dispensing Source Selection Section**
```html
<!-- Dispensing Source Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Dispensing Target Selection Section**
```html
<!-- Dispensing Target Selection -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Procedure Sub-Type Selection Section**
```html
<!-- Procedure Sub-Type Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **5. Configuration Input Section**
```html
<!-- Configuration Input -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="قائمة منسدله لنوع الاجراء الرئيسي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem Caption="قائمة منسدله للاجراء الفرعي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem Caption="قائمة منسدله للاجراء الفرعي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem Caption="قائمة منسدله للاجراء الفرعي" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem Caption="استرجاع رقم طلب الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **6. Configuration Grid Section**
```html
<!-- Configuration Grid -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="TawreedGrid" runat="server">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Procedure Type Data Source (Placeholder)
SqlDataSource MR_Datasorce = new SqlDataSource();
MR_Datasorce.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
MR_Datasorce.SelectCommand = "Select FileID,Patient_Name from Patient_information";

// Configuration Data Source (Assumed)
SqlDataSource TawreedGridDS = new SqlDataSource();
TawreedGridDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TawreedGridDS.SelectCommand = "SELECT id, Basic_Data_from, Basic_Data_from1, english_name, arabic_name, location_account_id, ar_name, account_center_id, Cost_Name_AR, department_type, Name, account_center_type, account_center_name, department_status, department_status1, management_type, management_type1, permitted_procedures FROM Inventories_Procedures_Configuration";
```

## Business Logic and Validation

### Procedure Type Validation

```csharp
protected void Save_Click(object sender, EventArgs e)
{
    if (!rb_basic_data.Checked && !BootstrapRadioButton1.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الاجراء');", true);
        return;
    }
    // ... additional validation
}
```

**Procedure Type Logic**: Validates procedure type selection before saving
**Error Prevention**: Prevents saving without proper procedure type selection

### Dispensing Source Validation

```csharp
protected void Save_Click(object sender, EventArgs e)
{
    if (!BootstrapRadioButton2.Checked && !BootstrapRadioButton3.Checked && !BootstrapRadioButton4.Checked && !BootstrapRadioButton5.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار مصدر الصرف');", true);
        return;
    }
    // ... additional validation
}
```

**Dispensing Source Logic**: Validates dispensing source selection before saving
**Error Prevention**: Prevents saving without proper dispensing source selection

### Dispensing Target Validation

```csharp
protected void Save_Click(object sender, EventArgs e)
{
    if (!BootstrapRadioButton6.Checked && !BootstrapRadioButton7.Checked && !BootstrapRadioButton8.Checked && !BootstrapRadioButton9.Checked && !BootstrapRadioButton10.Checked && !BootstrapRadioButton11.Checked && !BootstrapRadioButton12.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار هدف الصرف');", true);
        return;
    }
    // ... additional validation
}
```

**Dispensing Target Logic**: Validates dispensing target selection before saving
**Error Prevention**: Prevents saving without proper dispensing target selection

### Procedure Sub-Type Validation

```csharp
protected void Save_Click(object sender, EventArgs e)
{
    if (!BootstrapRadioButton13.Checked && !BootstrapRadioButton14.Checked)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الاجراء الفرعي');", true);
        return;
    }
    // ... additional validation
}
```

**Procedure Sub-Type Logic**: Validates procedure sub-type selection before saving
**Error Prevention**: Prevents saving without proper procedure sub-type selection

### Main Procedure Type Validation

```csharp
protected void Save_Click(object sender, EventArgs e)
{
    if (MR.Value == "" || MR.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الاجراء الرئيسي');", true);
        return;
    }
    // ... additional validation
}
```

**Main Procedure Type Logic**: Validates main procedure type selection before saving
**Error Prevention**: Prevents saving without proper main procedure type selection

### Sub-Procedure Validation

```csharp
protected void Save_Click(object sender, EventArgs e)
{
    if (BootstrapComboBox1.Value == "" || BootstrapComboBox1.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الاجراء الفرعي');", true);
        return;
    }
    // ... additional validation
}
```

**Sub-Procedure Logic**: Validates sub-procedure selection before saving
**Error Prevention**: Prevents saving without proper sub-procedure selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Procedure Type Selection Validation**: Must select procedure type before loading sub-procedures
- **Dispensing Source Selection Validation**: Must select dispensing source before loading procedures
- **Dispensing Target Selection Validation**: Must select dispensing target before loading procedures
- **Procedure Sub-Type Selection Validation**: Must select procedure sub-type before loading procedures
- **Main Procedure Type Selection Validation**: Must select main procedure type before loading sub-procedures
- **Sub-Procedure Selection Validation**: Must select sub-procedure before loading configuration
- **Dispensing Request Number Validation**: Must enter dispensing request number before retrieval

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Procedure Type Validation**: Ensures procedure type is valid and available
- **Dispensing Source Validation**: Ensures dispensing source is valid and available
- **Dispensing Target Validation**: Ensures dispensing target is valid and available
- **Procedure Sub-Type Validation**: Ensures procedure sub-type is valid and available
- **Main Procedure Type Validation**: Ensures main procedure type is valid and available
- **Sub-Procedure Validation**: Ensures sub-procedure is valid and available
- **Dispensing Request Number Validation**: Ensures dispensing request number is valid

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Configuration Access**: Ensures user has access to configuration operations

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Configuration Save Success**: "تم حفظ الاعدادات" (Configuration saved successfully)
- **Configuration Load Success**: "تم تحميل الاعدادات" (Configuration loaded successfully)
- **Configuration Delete Success**: "تم حذف الاعدادات" (Configuration deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of configuration grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Procedure Management System**
- **Database Tables**:
  - `Inventories_Procedures_Configuration` - Procedure configuration records
- **Integration Details**:
  - Configuration workflow controlled by procedure type and dispensing source/target selection
  - Configuration data tracked with procedure details
  - Configuration records stored for procedure management
- **Data Flow**:
  - Configurations filtered by procedure type and dispensing source/target
  - Configuration data validated against available options
  - Configuration records stored for procedure management

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Permission System**:
  - User authentication required for all configuration operations
  - Procedure configuration permissions configured via employee group assignments

### Data Exchange

#### **Procedure and Configuration Information**
- **Database Tables**:
  - `Inventories_Procedures_Configuration` - Procedure configuration records
- **Real-time Data**:
  - Procedure information for configuration
  - Configuration details for procedure management
  - Configuration status updates
- **Data Relationships**:
  - Configurations linked to procedures via procedure type
  - Configuration status tracked in configuration records
  - Configuration details applied to procedure management

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع الاجراء" Error**
- **Cause**: Procedure type not selected before loading sub-procedures
- **Solution**: Always select procedure type before loading sub-procedures
- **Prevention**: Procedure type selection is required for all configuration operations

#### **"الرجاء اختيار مصدر الصرف" Error**
- **Cause**: Dispensing source not selected before loading procedures
- **Solution**: Always select dispensing source before loading procedures
- **Prevention**: Dispensing source selection is required for all configuration operations

#### **"الرجاء اختيار هدف الصرف" Error**
- **Cause**: Dispensing target not selected before loading procedures
- **Solution**: Always select dispensing target before loading procedures
- **Prevention**: Dispensing target selection is required for all configuration operations

#### **"الرجاء اختيار نوع الاجراء الفرعي" Error**
- **Cause**: Procedure sub-type not selected before loading procedures
- **Solution**: Always select procedure sub-type before loading procedures
- **Prevention**: Procedure sub-type selection is required for all configuration operations

#### **"الرجاء اختيار نوع الاجراء الرئيسي" Error**
- **Cause**: Main procedure type not selected before loading sub-procedures
- **Solution**: Always select main procedure type before loading sub-procedures
- **Prevention**: Main procedure type selection is required for all configuration operations

#### **"الرجاء اختيار الاجراء الفرعي" Error**
- **Cause**: Sub-procedure not selected before loading configuration
- **Solution**: Always select sub-procedure before loading configuration
- **Prevention**: Sub-procedure selection is required for all configuration operations

#### **Configuration Save Failed Error**
- **Cause**: Configuration cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

#### **Configuration Load Failed Error**
- **Cause**: Configuration cannot be loaded
- **Solution**: Verify configuration exists and is accessible
- **Prevention**: Ensure proper permissions for configuration access

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Configuration Access**: Access to configuration operations
- **Procedure Access**: Access to procedures with configuration workflow

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Configuration Workflow**: Understanding of configuration process
- **Procedure Management**: Knowledge of procedure selection and configuration
- **Dispensing Management**: Familiarity with dispensing source/target selection
- **Configuration Management**: Understanding of configuration save, load, and delete operations

## Usage Examples

### Basic Configuration Workflow

1. **Page Load**: Verify user is logged in with proper permissions
2. **Procedure Type Selection**: Select procedure type for configuration
3. **Dispensing Source Selection**: Select dispensing source for configuration
4. **Dispensing Target Selection**: Select dispensing target for configuration
5. **Procedure Sub-Type Selection**: Select procedure sub-type for configuration
6. **Main Procedure Type Selection**: Select main procedure type for configuration
7. **Sub-Procedure Selection**: Select sub-procedure for configuration
8. **Configuration Save**: Click save button to create complete configuration

### Configuration Management Workflow

1. **Procedure Type Selection**: Select procedure type for configuration
2. **Dispensing Source Selection**: Select dispensing source for configuration
3. **Dispensing Target Selection**: Select dispensing target for configuration
4. **Procedure Sub-Type Selection**: Select procedure sub-type for configuration
5. **Main Procedure Type Selection**: Select main procedure type for configuration
6. **Sub-Procedure Selection**: Select sub-procedure for configuration
7. **Configuration Review**: Review configuration in grid
8. **Configuration Edit**: Edit configuration in grid
9. **Configuration Delete**: Remove configuration from grid
10. **Configuration Completion**: Save configuration with all validated options

### Multi-Procedure Configuration Management

1. **Procedure Type Selection**: Select procedure type for configuration
2. **Dispensing Source Selection**: Select dispensing source for configuration
3. **Dispensing Target Selection**: Select dispensing target for configuration
4. **Procedure Sub-Type Selection**: Select procedure sub-type for configuration
5. **Configuration Review**: Review all configurations in grid
6. **Selective Configuration**: Configure specific procedures as needed
7. **Configuration Validation**: Ensure all configurations have proper validation
8. **Configuration Save**: Save configuration with all validated options