← Go back to 
[Inventories Module Documentation](/Inventories)

# check.aspx

## Overview

**File**: `\Inventories\Process\check.aspx`
**Purpose**: Committee configuration and management system for inventory examination with member assignment and permission management
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: System administrators, inventory managers, committee coordinators

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Committee Code (Auto-generated)**
- **Committee Code Field**: Auto-generated unique identifier for permanent committees
- **Error Prevention**: System automatically generates committee codes
- **Data Source**: Inventories_check_header table with auto-increment ID
- **Default Behavior**: System generates code automatically on committee creation
- **Error Message**: N/A - auto-generated field
- **Validation**: Unique committee identification

#### 2. **Item Type Selection (Required for Committee)**
- **Item Type Dropdown**: Must select valid item type for committee configuration
- **Error Prevention**: System validates item type is selected before committee operations
- **Data Source**: Inventories_item_type table filtered by active status and item level
- **Default Behavior**: User must select item type manually
- **Error Message**: Validation prevents committee operations without item type selection
- **Validation**: Only active item types (active='1', item_level='1') are available

#### 3. **Department Selection (Required for Committee)**
- **Department Dropdown**: Must select valid department for committee assignment
- **Error Prevention**: System validates department is selected before committee operations
- **Data Source**: DefinitionDep table with department master data
- **Default Behavior**: User must select department manually
- **Error Message**: Validation prevents committee operations without department selection
- **Validation**: All departments are available for selection

#### 4. **Committee Type Selection (Required for Configuration)**
- **Committee Type Dropdown**: Must select valid committee type for examination workflow
- **Error Prevention**: System validates committee type is selected before committee operations
- **Data Source**: Inventories_check_type table filtered by active status
- **Default Behavior**: User must select committee type manually
- **Error Message**: Validation prevents committee operations without committee type selection
- **Validation**: Only active committee types (active=1) are available

#### 5. **Permission Duration Selection (Required for Committee)**
- **Permission Duration Dropdown**: Must select valid permission duration for committee operations
- **Error Prevention**: System validates permission duration is selected before committee operations
- **Data Source**: Inventories_check_user_permission_duration table filtered by active status
- **Default Behavior**: User must select permission duration manually
- **Error Message**: Validation prevents committee operations without permission duration selection
- **Validation**: Only active permission durations (Active=1) are available

#### 6. **Committee Description (Required for Committee)**
- **Description Field**: Must enter valid committee description for identification
- **Error Prevention**: System validates description is entered before committee operations
- **Data Source**: User input with validation
- **Default Behavior**: User must enter description manually
- **Error Message**: Validation prevents committee operations without description
- **Validation**: Description must be non-empty

#### 7. **Committee Head Selection (Required for Committee)**
- **Committee Head Dropdown**: Must select valid employee for committee head position
- **Error Prevention**: System validates committee head is selected before committee operations
- **Data Source**: Users table filtered by active employees excluding already assigned members
- **Default Behavior**: User must select committee head manually
- **Error Message**: Validation prevents committee operations without committee head selection
- **Validation**: Only active employees (Active=1) excluding system users and already assigned members

#### 8. **Committee Member Selection (Optional for Committee)**
- **Member Dropdowns**: Optional selection of up to 5 committee members
- **Error Prevention**: System allows empty member selection
- **Data Source**: Users table filtered by active employees excluding already assigned members
- **Default Behavior**: User can select members manually or leave empty
- **Error Message**: N/A - optional fields
- **Validation**: Only active employees (Active=1) excluding system users and already assigned members

### Common Error Scenarios and Prevention

#### **Committee Configuration Errors**
- **Error**: No item type selected
- **Prevention**: Always select item type before committee operations
- **Error**: No department selected
- **Prevention**: Always select department before committee operations
- **Error**: No committee type selected
- **Prevention**: Always select committee type before committee operations
- **Error**: No permission duration selected
- **Prevention**: Always select permission duration before committee operations
- **Error**: No committee description entered
- **Prevention**: Always enter committee description before committee operations

#### **Committee Member Errors**
- **Error**: No committee head selected
- **Prevention**: Always select committee head before committee operations
- **Error**: Committee head already assigned as member
- **Prevention**: System prevents duplicate assignments
- **Error**: Committee member already assigned
- **Prevention**: System prevents duplicate member assignments
- **Error**: Invalid employee selection
- **Prevention**: System validates employee is active and available

#### **Committee Operations Errors**
- **Error**: Committee save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Committee edit fails
- **Prevention**: Select valid committee from grid before editing
- **Error**: Committee delete fails
- **Prevention**: Select valid committee from grid before deleting
- **Error**: Committee member addition fails
- **Prevention**: Ensure committee is saved before adding members

#### **Permission and Access Errors**
- **Error**: User not authorized
- **Prevention**: Ensure user has committee management permissions
- **Error**: Committee access denied
- **Prevention**: Verify user has access to committee operations
- **Error**: Department access restricted
- **Prevention**: Ensure user has access to selected department

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have committee management permissions** via employee group assignments
3. **Item types must be configured** in the system
4. **Departments must be configured** in the system
5. **Committee types must be configured** in the system
6. **Permission durations must be configured** in the system

#### **Required System State**
- User authentication must be active
- Committee management permissions must be configured
- Item type master data must be current
- Department master data must be current
- Committee type master data must be current
- Permission duration master data must be current

### Success Criteria

#### **For Committee Configuration**
- ✅ Item type dropdown populated with active item types only
- ✅ Department dropdown populated with all departments
- ✅ Committee type dropdown populated with active committee types only
- ✅ Permission duration dropdown populated with active permission durations only
- ✅ Committee description validation ensures non-empty description

#### **For Committee Member Assignment**
- ✅ Committee head dropdown populated with available employees only
- ✅ Member dropdowns populated with available employees only
- ✅ Committee head validation prevents duplicate assignments
- ✅ Member validation prevents duplicate assignments
- ✅ Employee availability validation ensures proper assignments

#### **For Committee Operations**
- ✅ Committee save creates proper committee record
- ✅ Committee edit updates existing committee properly
- ✅ Committee delete removes committee from system
- ✅ Committee member addition adds members to committee
- ✅ Committee member edit updates member permissions
- ✅ Committee member delete removes members from committee

#### **For Committee Management**
- ✅ Committee grid displays all active committees
- ✅ Committee selection enables edit/delete operations
- ✅ Committee member popup displays committee members
- ✅ Committee member management works properly
- ✅ Success feedback confirms all operations

#### **For Data Management**
- ✅ Committee grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for committee configuration

### Committee Configuration Section

```html
<!-- Committee Configuration -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="كود اللجنة الدائم" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" ID="txt_code"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الاصناف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox runat="server" ID="cb_item_type" AutoPostBack="false" ValueField="id" TextField="english_name" TextFormatString="{1}" DataSourceID="SqlDataSource6"></dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع اللجنة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="check_type_comp" runat="server" TextFormatString="{1}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" OnSelectedIndexChanged="check_type_comp_SelectedIndexChanged" EnableCallbackMode="True" DataSourceID="SqlDataSource1" ValueField="id" TextField="check_type">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="check_type" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="مدة الصلاحية" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="permission_duration" runat="server" TextFormatString="{0} - {1}" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" ValueField="id" TextField="permission" DataSourceID="SqlDataSource3">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="ID" />
                            <dx:BootstrapListBoxField FieldName="permission" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="مسمى اللجنة" ColSpanMd="12" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="description"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Committee Member Assignment Section

```html
<!-- Committee Member Assignment -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رئيس اللجنة" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex;">
                        <dx:BootstrapComboBox ID="head_emp" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="True" EnableMultiColumn="true" OnSelectedIndexChanged="head_emp_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp_head" ValueField="Emp_Code" TextField="User_Name">
                            <Fields>
                                <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                <dx:BootstrapListBoxField FieldName="User_Name" />
                            </Fields>
                        </dx:BootstrapComboBox>
                        <asp:Button ID="ClearButton" runat="server" Text="X" CssClass="dx-clear-button" OnClick="ClearButton_Click" />
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="1 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex;">
                        <dx:BootstrapComboBox ID="emp111" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="true" EnableMultiColumn="true" OnSelectedIndexChanged="emp111_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="true" DataSourceID="Emp11" ValueField="Emp_Code" TextField="User_Name">
                            <Fields>
                                <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                <dx:BootstrapListBoxField FieldName="User_Name" />
                            </Fields>
                            <ClearButton DisplayMode="Always" />
                        </dx:BootstrapComboBox>
                        <asp:Button ID="Button1emp111" runat="server" Text="X" CssClass="dx-clear-button" OnClick="Button1emp111_Click" />
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="2 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex;">
                        <dx:BootstrapComboBox ID="emp2" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="True" EnableMultiColumn="true" OnSelectedIndexChanged="emp2_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp22" ValueField="Emp_Code" TextField="User_Name">
                            <ClearButton Visibility="True"></ClearButton>
                            <Fields>
                                <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                <dx:BootstrapListBoxField FieldName="User_Name" />
                            </Fields>
                        </dx:BootstrapComboBox>
                        <asp:Button ID="Button2emp2" runat="server" Text="X" CssClass="dx-clear-button" OnClick="Button2emp2_Click" />
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="3 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex;">
                        <dx:BootstrapComboBox ID="emp3" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="True" EnableMultiColumn="true" OnSelectedIndexChanged="emp3_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp33" ValueField="Emp_Code" TextField="User_Name">
                            <ClearButton Visibility="True"></ClearButton>
                            <Fields>
                                <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                <dx:BootstrapListBoxField FieldName="User_Name" />
                            </Fields>
                        </dx:BootstrapComboBox>
                        <asp:Button ID="Button3emp3" runat="server" Text="X" CssClass="dx-clear-button" OnClick="Button3emp3_Click" />
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="4 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex;">
                        <dx:BootstrapComboBox ID="emp4" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="True" EnableMultiColumn="true" OnSelectedIndexChanged="emp4_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp44" ValueField="Emp_Code" TextField="User_Name">
                            <ClearButton Visibility="True"></ClearButton>
                            <Fields>
                                <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                <dx:BootstrapListBoxField FieldName="User_Name" />
                            </Fields>
                        </dx:BootstrapComboBox>
                        <asp:Button ID="Button4emp4" runat="server" Text="X" CssClass="dx-clear-button" OnClick="Button4emp4_Click" />
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="5 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display:flex;">
                        <dx:BootstrapComboBox ID="emp5" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="True" EnableMultiColumn="true" OnSelectedIndexChanged="emp5_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp55" ValueField="Emp_Code" TextField="User_Name">
                            <ClearButton Visibility="True"></ClearButton>
                            <Fields>
                                <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                <dx:BootstrapListBoxField FieldName="User_Name" />
                            </Fields>
                        </dx:BootstrapComboBox>
                        <asp:Button ID="Button5emp5" runat="server" Text="X" CssClass="dx-clear-button" OnClick="Button5emp5_Click" />
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="3" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton runat="server" ID="BTNSave" Width="100%" Text="اضافة" OnClick="BTNSave_Click">
                        <SettingsBootstrap RenderOption="Primary" />
                        <CssClasses Icon="iconsminds-save" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton runat="server" ID="BtnEdit" Width="100%" Text="تعديل" OnClick="BtnEdit_Click">
                        <SettingsBootstrap RenderOption="Secondary" />
                        <CssClasses Icon="iconsminds-file-edit" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton runat="server" ID="Btndelete" Width="100%" Text="حذف" OnClick="Btndelete_Click">
                        <SettingsBootstrap RenderOption="Danger" />
                        <CssClasses Icon="iconsminds-delete-file" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="ADD" runat="server" ClientInstanceName="btn" Width="100%" Text=" اضافة عضو للجنة" Visible="false" OnClick="ADD_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-user-following" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Committee Grid Section

```html
<!-- Committee Grid -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGrid" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" DataSourceID="SqlData_gridview" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="checkGrid_SelectionChanged" OnCustomButtonCallback="checkGrid_CustomButtonCallback">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Caption="كود اللجنة" VisibleIndex="0">
                                <SettingsEditForm Visible="False"></SettingsEditForm>
                            </dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Item_type_id" Caption="م" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="english_name" Caption="نوع الاصناف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="Dep_Name" Caption="الادارة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="User_Name" Caption="مسمى عضو اللجنة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="check_id" Caption="نوع اللجنة" Visible="false" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="check_type" Caption="نوع الصلاحية" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp_head" Caption="كود رئيس اللجنة" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="head_Name" Caption="رئيس اللجنة" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp1" Caption=" كود مسؤل 1" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="user_emp1" Caption="مسؤل 1" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp2" Caption=" كود مسؤل 2" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="user_emp2" Caption="مسؤل 2" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp3" Caption=" كود مسؤل3" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="user_emp3" Caption="مسؤل 3" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp4" Caption=" كود مسؤل 4" Visible="false"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="user_emp4" Caption="مسؤل 4" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="emp5" Caption=" كود مسؤل 5" Visible="false" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="user_emp5" Caption="مسؤل 5" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="check_type_permission" Caption="مدة الصلاحية" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="check_type_quration" Caption="مدة الصلاحية" Visible="false" VisibleIndex="16"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewTextColumn FieldName="description" Caption="مسمى اللجنة" Visible="true" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                            <dx:BootstrapGridViewCommandColumn Caption="م.اللجنة" VisibleIndex="18">
                                <CustomButtons>
                                    <dx:BootstrapGridViewCommandColumnCustomButton ID="ShowRequest" Text="عرض" />
                                </CustomButtons>
                            </dx:BootstrapGridViewCommandColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                        <SettingsDetail ShowDetailRow="true" AllowOnlyOneMasterRowExpanded="true" />
                        <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                        <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                        <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Committee Member Popup Section

```html
<!-- Committee Member Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl runat="server" ID="UomType" SettingsBootstrap-Sizing="Large" Width="1200" ShowCloseButton="true" Modal="true" HeaderText="اضافة عضو للجنة" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
                <SettingsAdaptivity Mode="OnWindowInnerWidth" />
                <ContentCollection>
                    <dx:ContentControl>
                        <dx:BootstrapFormLayout ID="BootstrapFormLayout9" runat="server">
                            <Items>
                                <dx:BootstrapLayoutGroup ShowCaption="false">
                                    <CssClasses GroupContent="bg-light text-dark" />
                                    <Items>
                                        <dx:BootstrapLayoutItem Caption="المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapComboBox ID="user_code" runat="server" TextFormatString="{0} - {1}" Enabled="true" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                                                        <Fields>
                                                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                                                            <dx:BootstrapListBoxField FieldName="User_Name" />
                                                        </Fields>
                                                    </dx:BootstrapComboBox>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem Caption="الصلاحية" ColSpanMd="4">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapComboBox ID="permission_type" runat="server" TextFormatString="{0} - {1}" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource9" ValueField="id" TextField="permission">
                                                        <Fields>
                                                            <dx:BootstrapListBoxField FieldName="ID" />
                                                            <dx:BootstrapListBoxField FieldName="permission" />
                                                        </Fields>
                                                    </dx:BootstrapComboBox>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="add_save" Width="100%" OnClick="add_save_Click" Text="اضافة">
                                                        <SettingsBootstrap RenderOption="Success" />
                                                        <CssClasses Icon="iconsminds-save" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="Edit_emp" Width="100%" Enabled="false" OnClick="Edit_emp_Click" Text="تعديل">
                                                        <SettingsBootstrap RenderOption="Secondary" />
                                                        <CssClasses Icon="iconsminds-file-edit" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="4">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapButton runat="server" ID="delete_emp" Width="100%" Enabled="false" OnClick="delete_emp_Click" Text="حذف">
                                                        <SettingsBootstrap RenderOption="Danger" />
                                                        <CssClasses Icon="iconsminds-delete-file" />
                                                    </dx:BootstrapButton>
                                                </dx:ContentControl>
                                            </ContentCollection>
                                        </dx:BootstrapLayoutItem>
                                        <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                                            <ContentCollection>
                                                <dx:ContentControl>
                                                    <dx:BootstrapGridView runat="server" ID="uomGridView1" ClientInstanceName="gridreuom" Width="100%" KeyFieldName="id" AutoGenerateColumns="false" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" autopostpacck="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" DataSourceID="SqlDataSource10" OnSelectionChanged="uomGridView1_SelectionChanged">
                                                        <Settings ShowFilterRow="true" />
                                                        <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                                                        <Columns>
                                                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="emp_code" Caption="emp_code" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="User_Name" Caption="مسمى عضو اللجنة" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="user_permission" Caption="user_permission" VisibleIndex="2" Visible="false"></dx:BootstrapGridViewTextColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="permission_check" Caption="الصلاحية" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="user_permission_duration" Visible="false" Caption="user_permission_duration" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="permission" Caption="مدة الصلاحية" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                                            <dx:BootstrapGridViewTextColumn FieldName="id" VisibleIndex="11" Caption="id" Visible="false" ReadOnly="True"></dx:BootstrapGridViewTextColumn>
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
                            </Items>
                        </dx:BootstrapFormLayout>
                    </dx:ContentControl>
                </ContentCollection>
            </dx:BootstrapPopupControl>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses committee and member parameters for comprehensive data filtering:

**Committee Parameters**:
- `@code_check` - Committee ID for filtering committee members
- `@FK_OrderID` - Committee ID for filtering committee details

**User Context Parameters**:
- `@emp111, @emp2, @emp3, @emp4, @emp5` - Employee codes for filtering available employees

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Committee Selection**: Loads committee details for selected committee
3. **Member Management**: Manages committee members and their permissions
4. **Committee Operations**: Creates, updates, or deletes committees
5. **Member Operations**: Adds, edits, or removes committee members
6. **Grid Display**: Shows all active committees with member information

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Disables readonly fields appropriately
4. Sets default committee configuration state

### BTNSave_Click Method

```csharp
protected void BTNSave_Click(object sender, EventArgs e)
```

**Purpose**: Creates new committee with configuration and members

**Process**:
1. Validates all required fields are filled
2. Generates new committee code
3. Inserts committee header record
4. Inserts committee members if selected
5. Refreshes committee grid
6. Provides success feedback

### BtnEdit_Click Method

```csharp
protected void BtnEdit_Click(object sender, EventArgs e)
```

**Purpose**: Updates existing committee configuration

**Process**:
1. Validates committee selection from grid
2. Updates committee header record
3. Refreshes committee grid
4. Provides success feedback

### Btndelete_Click Method

```csharp
protected void Btndelete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes committee from system

**Process**:
1. Validates committee selection from grid
2. Updates committee status to inactive (active='0')
3. Refreshes committee grid
4. Provides success feedback

### ADD_Click Method

```csharp
protected void ADD_Click(object sender, EventArgs e)
```

**Purpose**: Opens committee member popup for member management

**Process**:
1. Validates committee selection from grid
2. Opens committee member popup
3. Loads committee members for selected committee
4. Enables member management operations

### add_save_Click Method

```csharp
protected void add_save_Click(object sender, EventArgs e)
```

**Purpose**: Adds new member to committee

**Process**:
1. Validates member selection
2. Validates permission selection
3. Inserts committee member record
4. Refreshes committee member grid
5. Provides success feedback

### Edit_emp_Click Method

```csharp
protected void Edit_emp_Click(object sender, EventArgs e)
```

**Purpose**: Updates existing committee member

**Process**:
1. Validates member selection from grid
2. Updates committee member record
3. Refreshes committee member grid
4. Provides success feedback

### delete_emp_Click Method

```csharp
protected void delete_emp_Click(object sender, EventArgs e)
```

**Purpose**: Removes member from committee

**Process**:
1. Validates member selection from grid
2. Updates member status to inactive (active=0)
3. Refreshes committee member grid
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_check_header**
- **Purpose**: Committee header configuration with member assignments
- **Key Fields**: ID, Item_type_id, dep_id, emp_responsible, check_id, check_type, description, emp_head, emp1, emp2, emp3, emp4, emp5, active
- **Status Values**: active='1' (active), '0' (inactive)
- **Usage**: Main table for committee configuration and member assignments

#### **Inventories_check_details**
- **Purpose**: Committee member details with permissions
- **Key Fields**: id, check_id, emp_code, user_permission, user_permission_duration, active
- **Status Values**: active=1 (active), 0 (inactive)
- **Usage**: Tracks committee members and their permissions

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, english_name, active, item_level
- **Usage**: Provides item type options for committee configuration

#### **Inventories_check_type**
- **Purpose**: Committee type master data
- **Key Fields**: id, check_type, active
- **Usage**: Provides committee type options for examination workflow

#### **Inventories_check_user_permission**
- **Purpose**: Committee member permission types
- **Key Fields**: id, permission, Active
- **Usage**: Provides permission options for committee members

#### **Inventories_check_user_permission_duration**
- **Purpose**: Committee permission duration options
- **Key Fields**: ID, permission, Active
- **Usage**: Provides permission duration options for committee operations

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name, Active
- **Usage**: Provides employee options for committee assignments

#### **DefinitionDep**
- **Purpose**: Department master data
- **Key Fields**: DepID, Dep_Name
- **Usage**: Provides department options for committee configuration

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing committee operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for committee operations

#### **Employee Filtering**
```sql
select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00',@emp111,@emp2,@emp3,@emp4,@emp5)
```

**Filtering Logic**: Shows only active employees excluding system users and already assigned members
**Permission Logic**: Only active employees can be committee members
**Validation**: Ensures committee members are valid employees

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

### Checkbox Selection Logic

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

**Selection Logic**: Ensures only one checkbox can be selected at a time
**Grid Logic**: Works within grid context to manage row selection
**Usage**: Applied to grid checkboxes for single selection behavior

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

### Popup and Callback Handling

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

**Popup Logic**: Shows popup at clicked element with callback functionality
**Data Loading**: Loads detailed data via callback when popup is shown
**User Experience**: Provides seamless detail viewing without page refresh

### Browser Security

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Security Logic**: Prevents browser back button navigation
**Session Management**: Ensures proper session handling
**User Experience**: Maintains application state and security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Committee Configuration Section**
```html
<!-- Committee Configuration -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="كود اللجنة الدائم" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="نوع الاصناف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="نوع اللجنة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="مدة الصلاحية" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
        <dx:BootstrapLayoutItem Caption="مسمى اللجنة" ColSpanMd="12" CaptionSettings-HorizontalAlign="Right">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Committee Member Assignment Section**
```html
<!-- Committee Member Assignment -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رئيس اللجنة" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
        <dx:BootstrapLayoutItem Caption="1 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
        <dx:BootstrapLayoutItem Caption="2 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
        <dx:BootstrapLayoutItem Caption="3 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
        <dx:BootstrapLayoutItem Caption="4 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
        <dx:BootstrapLayoutItem Caption="5 المسؤل" ColSpanMd="4" CaptionSettings-HorizontalAlign="Right">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="3" BeginRow="true">
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Committee Grid Section**
```html
<!-- Committee Grid -->
<dx:BootstrapLayoutGroup Caption="" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView ID="checkGrid" runat="server" OnSelectionChanged="checkGrid_SelectionChanged">
```

#### **5. Committee Member Popup Section**
```html
<!-- Committee Member Popup -->
<dx:BootstrapLayoutItem Caption="" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapPopupControl ID="UomType" runat="server" HeaderText="اضافة عضو للجنة">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Item Type Data Source
SqlDataSource SqlDataSource6 = new SqlDataSource();
SqlDataSource6.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource6.SelectCommand = "SELECT id, english_name FROM Inventories_item_type WHERE (active = '1') and Inventories_item_type.item_level='1'";

// Committee Type Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "SELECT id, check_type FROM Inventories_check_type WHERE (active = 1)";

// Permission Duration Data Source
SqlDataSource SqlDataSource3 = new SqlDataSource();
SqlDataSource3.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource3.SelectCommand = "SELECT ID, permission FROM Inventories_check_user_permission_duration WHERE (Active = 1)";

// Committee Grid Data Source
SqlDataSource SqlData_gridview = new SqlDataSource();
SqlData_gridview.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlData_gridview.SelectCommand = "SELECT Inventories_check_header.ID, Item_type_id,Inventories_item_type.english_name, Inventories_check_header.dep_id,DefinitionDep.Dep_Name, emp_responsible,Users.User_Name, check_id,Inventories_check_type.check_type, emp_head,user_head.User_Name as head_Name,emp1,user_emp1.User_Name as user_emp1,emp2,user_emp2.User_Name as user_emp2,emp3,user_emp3.User_Name as user_emp3,emp4,user_emp4.User_Name as user_emp4,emp5,user_emp5.User_Name as user_emp5,Inventories_check_header.check_type as check_type_quration,Inventories_check_user_permission_duration.permission as check_type_permission,Inventories_check_header.description FROM Inventories_check_header left join Inventories_check_type on Inventories_check_header.check_id=Inventories_check_type.id inner join Inventories_item_type on Inventories_item_type.id=Item_type_id inner join Orman.dbo.DefinitionDep on DefinitionDep.DepID =Inventories_check_header.dep_id left join Users on Users.Emp_Code=Inventories_check_header.emp_responsible inner join Users user_head on user_head.Emp_Code=Inventories_check_header.emp_head left join Users user_emp1 on user_emp1.Emp_Code=Inventories_check_header.emp1 left join Users user_emp2 on user_emp2.Emp_Code=Inventories_check_header.emp2 left join Users user_emp3 on user_emp3.Emp_Code=Inventories_check_header.emp3 left join Users user_emp4 on user_emp4.Emp_Code=Inventories_check_header.emp4 left join Users user_emp5 on user_emp5.Emp_Code=Inventories_check_header.emp5 inner join Inventories_check_user_permission_duration on Inventories_check_header.check_type=Inventories_check_user_permission_duration.ID where Inventories_check_header.active='1' order by ID asc";

// Committee Member Data Source
SqlDataSource SqlDataSource10 = new SqlDataSource();
SqlDataSource10.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource10.SelectCommand = "select Inventories_check_details.id,Inventories_check_details.emp_code,Users.User_Name,Inventories_check_details.user_permission,Inventories_check_user_permission.permission as permission_check,Inventories_check_details.user_permission_duration,Inventories_check_user_permission_duration.permission from Inventories_check_details inner join Inventories_check_user_permission on Inventories_check_details.user_permission=Inventories_check_user_permission.id inner join Inventories_check_user_permission_duration on Inventories_check_details.user_permission_duration=Inventories_check_user_permission_duration.id inner join Users on Users.Emp_Code=Inventories_check_details.emp_code where Inventories_check_details.active=1 and check_id=@code_check";
```

## Business Logic and Validation

### Committee Configuration Validation

```csharp
protected void BTNSave_Click(object sender, EventArgs e)
{
    if (cb_item_type.Value == "" || cb_item_type.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع الاصناف');", true);
        return;
    }
    else if (Dep.Value == "" || Dep.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الادارة');", true);
        return;
    }
    else if (check_type_comp.Value == "" || check_type_comp.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار نوع اللجنة');", true);
        return;
    }
    else if (permission_duration.Value == "" || permission_duration.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار مدة الصلاحية');", true);
        return;
    }
    else if (description.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال مسمى اللجنة');", true);
        return;
    }
    else if (head_emp.Value == "" || head_emp.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار رئيس اللجنة');", true);
        return;
    }
    // ... save logic
}
```

**Item Type Logic**: Validates item type selection before committee creation
**Department Logic**: Validates department selection before committee creation
**Committee Type Logic**: Validates committee type selection before committee creation
**Permission Duration Logic**: Validates permission duration selection before committee creation
**Description Logic**: Validates committee description before committee creation
**Committee Head Logic**: Validates committee head selection before committee creation
**Error Prevention**: Prevents committee creation without proper configuration

### Committee Member Validation

```csharp
protected void add_save_Click(object sender, EventArgs e)
{
    if (user_code.Value == "" || user_code.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المسؤل');", true);
        return;
    }
    else if (permission_type.Value == "" || permission_type.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصلاحية');", true);
        return;
    }
    // ... add logic
}
```

**Member Logic**: Validates member selection before adding to committee
**Permission Logic**: Validates permission selection before adding to committee
**Error Prevention**: Prevents committee member addition without proper selection

### Committee Operations Validation

```csharp
protected void BtnEdit_Click(object sender, EventArgs e)
{
    if (checkGrid.Selection.Count == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار اللجنة');", true);
        return;
    }
    // ... edit logic
}
```

**Selection Logic**: Validates committee selection before edit/delete operations
**Error Prevention**: Prevents committee operations without proper selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Item Type Selection Validation**: Must select item type before committee operations
- **Department Selection Validation**: Must select department before committee operations
- **Committee Type Selection Validation**: Must select committee type before committee operations
- **Permission Duration Selection Validation**: Must select permission duration before committee operations
- **Description Validation**: Must enter committee description before committee operations
- **Committee Head Validation**: Must select committee head before committee operations
- **Member Selection Validation**: Must select member before adding to committee
- **Permission Selection Validation**: Must select permission before adding to committee

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Committee Configuration Validation**: Ensures all required fields are filled
- **Committee Member Validation**: Ensures members are properly assigned
- **Permission Validation**: Ensures permissions are properly configured
- **Employee Availability Validation**: Ensures employees are available for assignment

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to department data
- **Committee Access**: Ensures user has access to committee operations
- **Employee Access**: Ensures user can access and modify employee assignments

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Committee Save Success**: "تم اضافة اللجنة" (Committee added successfully)
- **Committee Edit Success**: "تم تعديل اللجنة" (Committee edited successfully)
- **Committee Delete Success**: "تم حذف اللجنة" (Committee deleted successfully)
- **Member Add Success**: "تم اضافة العضو" (Member added successfully)
- **Member Edit Success**: "تم تعديل العضو" (Member edited successfully)
- **Member Delete Success**: "تم حذف العضو" (Member deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of committee grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Committee Management System**
- **Database Tables**:
  - `Inventories_check_header` - Committee configuration with member assignments
  - `Inventories_check_details` - Committee member details with permissions
  - `Inventories_check_type` - Committee type master data
  - `Inventories_check_user_permission` - Committee member permission types
  - `Inventories_check_user_permission_duration` - Committee permission duration options
- **Integration Details**:
  - Committee configuration controlled by item type and department
  - Committee members assigned from active employees
  - Committee permissions configured per member
  - Committee duration configured per committee type
- **Data Flow**:
  - Committees filtered by active status
  - Committee members filtered by committee assignment
  - Committee permissions configured per member
  - Committee duration configured per committee type

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all committee operations
  - Department auto-population based on user profile

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_item_type` - Item type master data
- **Integration Details**:
  - Item types filtered by active status and item level
  - Item types used for committee configuration
- **Data Flow**:
  - Item types filtered by active status
  - Item types used for committee configuration

### Data Exchange

#### **Committee Configuration Information**
- **Database Tables**:
  - `Inventories_check_header` - Committee configuration
  - `Inventories_item_type` - Item type master data
  - `DefinitionDep` - Department master data
- **Real-time Data**:
  - Committee configuration details
  - Item type associations
  - Department associations
- **Data Relationships**:
  - Committees linked to item types and departments
  - Committee configuration stored in header table
  - Committee members stored in details table

#### **Committee Member Information**
- **Database Tables**:
  - `Inventories_check_details` - Committee member details
  - `Users` - Employee master data
  - `Inventories_check_user_permission` - Permission types
  - `Inventories_check_user_permission_duration` - Permission duration
- **Real-time Data**:
  - Committee member assignments
  - Member permissions
  - Member permission duration
- **Data Relationships**:
  - Committee members linked to employees
  - Member permissions configured per member
  - Member duration configured per member

#### **Committee Type Information**
- **Database Tables**:
  - `Inventories_check_type` - Committee type master data
- **Real-time Data**:
  - Committee type options
  - Committee type associations
- **Data Relationships**:
  - Committee types used for committee configuration
  - Committee types linked to permission durations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار نوع الاصناف" Error**
- **Cause**: Item type not selected before committee operations
- **Solution**: Always select item type before committee operations
- **Prevention**: Item type selection is required for all committee operations

#### **"الرجاء اختيار الادارة" Error**
- **Cause**: Department not selected before committee operations
- **Solution**: Always select department before committee operations
- **Prevention**: Department selection is required for all committee operations

#### **"الرجاء اختيار نوع اللجنة" Error**
- **Cause**: Committee type not selected before committee operations
- **Solution**: Always select committee type before committee operations
- **Prevention**: Committee type selection is required for all committee operations

#### **"الرجاء اختيار مدة الصلاحية" Error**
- **Cause**: Permission duration not selected before committee operations
- **Solution**: Always select permission duration before committee operations
- **Prevention**: Permission duration selection is required for all committee operations

#### **"الرجاء ادخال مسمى اللجنة" Error**
- **Cause**: Committee description not entered before committee operations
- **Solution**: Always enter committee description before committee operations
- **Prevention**: Committee description is required for all committee operations

#### **"الرجاء اختيار رئيس اللجنة" Error**
- **Cause**: Committee head not selected before committee operations
- **Solution**: Always select committee head before committee operations
- **Prevention**: Committee head selection is required for all committee operations

#### **"الرجاء اختيار اللجنة" Error**
- **Cause**: No committee selected before edit/delete operations
- **Solution**: Always select committee before edit/delete operations
- **Prevention**: Committee selection is required for all committee operations

#### **"الرجاء اختيار المسؤل" Error**
- **Cause**: Member not selected before adding to committee
- **Solution**: Always select member before adding to committee
- **Prevention**: Member selection is required for all committee member operations

#### **"الرجاء اختيار الصلاحية" Error**
- **Cause**: Permission not selected before adding to committee
- **Solution**: Always select permission before adding to committee
- **Prevention**: Permission selection is required for all committee member operations

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Committee Management Access**: Access to committee management operations
- **Department Access**: Access to department data
- **Employee Access**: Access to employee data for committee assignments

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Committee Configuration**: Understanding of committee setup and configuration
- **Member Management**: Knowledge of committee member assignment and permissions
- **Permission Configuration**: Familiarity with permission types and durations
- **Committee Operations**: Understanding of committee create, edit, and delete operations

## Usage Examples

### Basic Committee Configuration Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Item Type Selection**: Select item type for committee configuration
3. **Department Selection**: Select department for committee assignment
4. **Committee Type Selection**: Select committee type for examination workflow
5. **Permission Duration Selection**: Select permission duration for committee operations
6. **Description Entry**: Enter committee description for identification
7. **Committee Head Selection**: Select committee head for committee leadership
8. **Member Selection**: Optionally select committee members
9. **Committee Save**: Click save button to create committee

### Committee Member Management Workflow

1. **Committee Selection**: Select committee from grid for member management
2. **Member Popup Open**: Click add member button to open member popup
3. **Member Selection**: Select employee for committee membership
4. **Permission Selection**: Select permission type for member
5. **Member Addition**: Click add button to add member to committee
6. **Member Review**: Review members in committee member grid
7. **Member Edit**: Select member and modify permissions if needed
8. **Member Delete**: Select member and remove from committee if needed

### Committee Operations Workflow

1. **Committee Creation**: Complete committee configuration with all required fields
2. **Committee Save**: Save committee to create header and member records
3. **Committee Review**: Review committee in committee grid
4. **Committee Edit**: Select committee and modify configuration if needed
5. **Committee Delete**: Select committee and remove from system if needed
6. **Committee Tracking**: Monitor committee status and member assignments

### Committee Permission Management Workflow

1. **Permission Configuration**: Configure permission types for committee members
2. **Duration Configuration**: Configure permission durations for committee operations
3. **Member Assignment**: Assign members with specific permissions
4. **Permission Review**: Review member permissions in committee member grid
5. **Permission Update**: Update member permissions as needed
6. **Permission Tracking**: Monitor permission usage and effectiveness
